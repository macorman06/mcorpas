/**
 * Follow-the-cursor portrait.
 *
 * One flat frontal image is drawn on a fine mesh. The vertex shader turns the head
 * a few degrees (yaw/pitch) using a fake ellipsoid depth, and the fragment shader
 * paints over each original iris with sclera and redraws it, shifted, inside the
 * eye opening. Eyes react faster than the head. No 3D model, no pose swapping.
 * A Canvas2D fallback moves only the eyes and tilts the image with CSS.
 */

export type Vec2 = [number, number];

export interface EyeConfig {
  /** Centre and radii of the eye opening (almond approximated by an ellipse), in UV. */
  opening: Vec2;
  openingR: Vec2;
  /** Centre and radius of the iris at rest. */
  iris: Vec2;
  irisR: Vec2;
  /** A clean patch of sclera used to cover the iris at its resting place. */
  sclera: Vec2;
}

export interface HeadConfig {
  width: number;
  height: number;
  eyes: [EyeConfig, EyeConfig];
  /** Ellipse that receives the 3D turn; outside it the image stays still. */
  headCenter: Vec2;
  headR: Vec2;
  /** Rows (UV y) where the turn fades out towards the neck/shoulders. */
  neckFade: Vec2;
  yaw: number;
  pitch: number;
  depth: number;
  /** Maximum iris travel in UV: inward, outward, vertical. */
  irisTravel: [number, number, number];
  /** Vertical point (UV) the head considers its "eye level". */
  eyeLevel: number;
}

export interface Gaze {
  x: number;
  y: number;
}

export const clamp = (value: number, min = -1, max = 1) =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : 0;

/** Frame-rate independent exponential smoothing. */
export const follow = (current: number, target: number, ms: number, response = 120) =>
  current + (target - current) * (1 - Math.exp(-Math.max(0, ms) / response));

export function headGazeAt(x: number, y: number, box: DOMRect, cfg: HeadConfig): Gaze {
  return {
    x: clamp((x - box.left - box.width * 0.5) / Math.max(1, box.width * 1.4)),
    y: clamp((y - box.top - box.height * cfg.eyeLevel) / Math.max(1, box.height * 1.2)),
  };
}

/** Each eye looks at the pointer on its own, so near pointers make the eyes converge. */
export function eyesGazeAt(x: number, y: number, box: DOMRect, cfg: HeadConfig): number[] {
  return cfg.eyes.flatMap(({ iris: [cx, cy] }) => {
    const dx = x - box.left - box.width * cx;
    const dy = y - box.top - box.height * cy;
    const distance = Math.hypot(dx, dy, box.width * 0.45);
    return [clamp(dx / Math.max(1, distance)), clamp(dy / Math.max(1, distance))];
  });
}

export interface Renderer {
  canvas: HTMLCanvasElement;
  kind: 'webgl' | 'canvas2d';
  resize(): void;
  draw(head: Gaze, eyes: number[]): void;
  dispose(): void;
}

const v2 = (v: Vec2) => `vec2(${v[0].toFixed(4)},${v[1].toFixed(4)})`;

function makeCanvas() {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.className = 'head-canvas';
  return canvas;
}

export function createWebGLRenderer(host: HTMLElement, image: HTMLImageElement, cfg: HeadConfig): Renderer | null {
  const canvas = makeCanvas();
  const gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false, powerPreference: 'low-power' });
  if (!gl) return null;

  const [travelIn, travelOut, travelY] = cfg.irisTravel;
  const vertexSource = `
    attribute vec2 a_uv;
    uniform vec2 u_gaze;
    varying vec2 v_uv;
    void main() {
      v_uv = a_uv;
      vec2 p = a_uv;
      vec2 e = (p - ${v2(cfg.headCenter)}) / ${v2(cfg.headR)};
      float inside = 1.0 - smoothstep(0.82, 1.12, length(e));
      float neck = 1.0 - smoothstep(${cfg.neckFade[0].toFixed(3)}, ${cfg.neckFade[1].toFixed(3)}, p.y);
      float w = inside * neck;
      float depth = sqrt(max(0.0, 1.0 - dot(e, e))) * ${cfg.depth.toFixed(3)};
      float yaw = u_gaze.x * ${cfg.yaw.toFixed(3)};
      float pitch = u_gaze.y * ${cfg.pitch.toFixed(3)};
      vec2 c = ${v2(cfg.headCenter)};
      vec2 turned = vec2(c.x + (p.x - c.x) * cos(yaw) + depth * sin(yaw),
                         c.y + (p.y - c.y) * cos(pitch) + depth * sin(pitch));
      p = mix(p, turned, w);
      gl_Position = vec4(p.x * 2.0 - 1.0, 1.0 - p.y * 2.0, 0.0, 1.0);
    }`;

  const eyeCall = (eye: EyeConfig, look: string, left: boolean) =>
    `color = eyeColor(v_uv, color, ${v2(eye.opening)}, ${v2(eye.openingR)}, ${v2(eye.iris)}, ${v2(eye.irisR)}, ${v2(eye.sclera)}, ${look}, ${left ? 'true' : 'false'});`;

  const fragmentSource = `
    precision mediump float;
    uniform sampler2D u_image;
    uniform vec4 u_eyes;
    varying vec2 v_uv;
    vec4 eyeColor(vec2 uv, vec4 color, vec2 opening, vec2 openingR, vec2 iris, vec2 irisR, vec2 sclera, vec2 look, bool leftEye) {
      float o = length((uv - opening) / openingR);
      if (o > 1.02) return color;
      float inOpening = 1.0 - smoothstep(0.90, 1.0, o);
      // 1. cover the resting iris with sclera sampled nearby
      float oldMask = (1.0 - smoothstep(0.96, 1.08, length((uv - iris) / irisR))) * inOpening;
      vec4 white = texture2D(u_image, sclera + (uv - iris) * 0.12);
      color = mix(color, white, oldMask);
      // 2. redraw the iris, shifted towards the pointer
      float toward = leftEye ? (look.x > 0.0 ? ${travelIn.toFixed(4)} : ${travelOut.toFixed(4)})
                             : (look.x > 0.0 ? ${travelOut.toFixed(4)} : ${travelIn.toFixed(4)});
      vec2 offset = look * vec2(toward, ${travelY.toFixed(4)});
      vec2 src = iris + (uv - iris - offset) / vec2(1.0 - abs(look.x) * 0.07, 1.0 - abs(look.y) * 0.04);
      float newMask = (1.0 - smoothstep(0.96, 1.02, length((src - iris) / irisR))) * inOpening;
      return mix(color, texture2D(u_image, src), newMask);
    }
    void main() {
      vec4 color = texture2D(u_image, v_uv);
      ${eyeCall(cfg.eyes[0], 'u_eyes.xy', true)}
      ${eyeCall(cfg.eyes[1], 'u_eyes.zw', false)}
      gl_FragColor = color;
    }`;

  const shaders: WebGLShader[] = [];
  let program: WebGLProgram | null = null;
  try {
    for (const [type, text] of [
      [gl.VERTEX_SHADER, vertexSource],
      [gl.FRAGMENT_SHADER, fragmentSource],
    ] as const) {
      const shader = gl.createShader(type);
      if (!shader) throw new Error('shader');
      gl.shaderSource(shader, text);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || 'shader');
      shaders.push(shader);
    }
    program = gl.createProgram();
    if (!program) throw new Error('program');
    shaders.forEach((s) => gl.attachShader(program!, s));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('link');
    gl.useProgram(program);

    const cols = 96;
    const rows = 96;
    const vertices: number[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const a = x / cols, b = y / rows, c = (x + 1) / cols, d = (y + 1) / rows;
        vertices.push(a, b, c, b, a, d, a, d, c, b, c, d);
      }
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, 'a_uv');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    if (gl.getError() !== gl.NO_ERROR) throw new Error('texture');

    const uGaze = gl.getUniformLocation(program, 'u_gaze');
    const uEyes = gl.getUniformLocation(program, 'u_eyes');
    const count = vertices.length / 2;
    host.append(canvas);

    const resize = () => {
      const box = host.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(box.width * ratio));
      canvas.height = Math.max(1, Math.round(box.height * ratio));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    return {
      canvas,
      kind: 'webgl',
      resize,
      draw(head, eyes) {
        gl.uniform2f(uGaze, head.x, head.y);
        gl.uniform4fv(uEyes, eyes);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, count);
      },
      dispose() {
        canvas.remove();
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      },
    };
  } catch (error) {
    if (import.meta.env.DEV) console.warn('[FollowHead] WebGL unavailable, using Canvas2D:', error);
    shaders.forEach((s) => gl.deleteShader(s));
    if (program) gl.deleteProgram(program);
    return null;
  }
}

export function createCanvasRenderer(host: HTMLElement, image: HTMLImageElement, cfg: HeadConfig): Renderer | null {
  const canvas = makeCanvas();
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const W = cfg.width, H = cfg.height;
  const [travelIn, travelOut, travelY] = cfg.irisTravel;

  // Pre-render a magnified sclera patch per eye, faded at the edges.
  const patches = cfg.eyes.map((eye) => {
    const rx = eye.irisR[0] * W, ry = eye.irisR[1] * H;
    const patch = document.createElement('canvas');
    patch.width = Math.ceil(rx * 2.2);
    patch.height = Math.ceil(ry * 2.2);
    const p = patch.getContext('2d')!;
    p.drawImage(image, eye.sclera[0] * W - rx * 0.13, eye.sclera[1] * H - ry * 0.13, rx * 0.26, ry * 0.26, 0, 0, patch.width, patch.height);
    p.globalCompositeOperation = 'destination-in';
    const g = p.createRadialGradient(patch.width / 2, patch.height / 2, patch.width * 0.44, patch.width / 2, patch.height / 2, patch.width / 2);
    g.addColorStop(0, 'rgba(0,0,0,1)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    p.fillStyle = g;
    p.fillRect(0, 0, patch.width, patch.height);
    return patch;
  });

  const drawEye = (eye: EyeConfig, patch: HTMLCanvasElement, look: number[], left: boolean) => {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(eye.opening[0] * W, eye.opening[1] * H, eye.openingR[0] * W * 0.95, eye.openingR[1] * H * 0.95, 0, 0, Math.PI * 2);
    ctx.clip();
    const cx = eye.iris[0] * W, cy = eye.iris[1] * H, rx = eye.irisR[0] * W, ry = eye.irisR[1] * H;
    ctx.drawImage(patch, cx - rx * 1.1, cy - ry * 1.1, rx * 2.2, ry * 2.2);
    const toward = left ? (look[0] > 0 ? travelIn : travelOut) : look[0] > 0 ? travelOut : travelIn;
    const dx = look[0] * toward * W, dy = look[1] * travelY * H;
    ctx.beginPath();
    ctx.ellipse(cx + dx, cy + dy, rx, ry, 0, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(image, cx - rx, cy - ry, rx * 2, ry * 2, cx + dx - rx, cy + dy - ry, rx * 2, ry * 2);
    ctx.restore();
  };

  host.append(canvas);
  const resize = () => {
    const box = host.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.max(1, Math.round(box.width * ratio));
    canvas.height = Math.max(1, Math.round(box.height * ratio));
  };
  resize();

  return {
    canvas,
    kind: 'canvas2d',
    resize,
    draw(head, eyes) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(canvas.width / W, 0, 0, canvas.height / H, 0, 0);
      ctx.drawImage(image, 0, 0, W, H);
      drawEye(cfg.eyes[0], patches[0], eyes.slice(0, 2), true);
      drawEye(cfg.eyes[1], patches[1], eyes.slice(2), false);
      canvas.style.transform = `perspective(900px) rotateY(${head.x * 4}deg) rotateX(${-head.y * 3}deg)`;
    },
    dispose() {
      canvas.remove();
    },
  };
}
