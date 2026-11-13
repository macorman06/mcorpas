import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pause, Play } from 'lucide-react';
import {
  HeadConfig,
  Renderer,
  createCanvasRenderer,
  createWebGLRenderer,
  eyesGazeAt,
  follow,
  headGazeAt,
} from '../lib/headRenderer';
import { AVATAR_CONFIG } from '../data/avatarHead';

interface Props {
  src: string;
  alt: string;
  config?: HeadConfig;
}

const FollowHead = ({ src, alt, config = AVATAR_CONFIG }: Props) => {
  const { t } = useTranslation();
  const hostRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [paused, setPaused] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [ready, setReady] = useState(false);
  const [coarse] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const host = hostRef.current;
    const image = imgRef.current;
    if (!host || !image) return;

    let renderer: Renderer | null = null;
    let raf = 0;
    let last = 0;
    let visible = true;
    let head = { x: 0, y: 0 };
    let headTarget = { x: 0, y: 0 };
    let eyes = [0, 0, 0, 0];
    let eyesTarget = [0, 0, 0, 0];
    let touchStart: { x: number; y: number } | null = null;
    let disposed = false;

    const draw = () => renderer?.draw(head, eyes);

    const frame = (time: number) => {
      raf = 0;
      const dt = last ? Math.min(64, time - last) : 16;
      last = time;
      head = { x: follow(head.x, headTarget.x, dt, 170), y: follow(head.y, headTarget.y, dt, 170) };
      eyes = eyes.map((v, i) => follow(v, eyesTarget[i], dt, 60));
      const settled =
        Math.hypot(headTarget.x - head.x, headTarget.y - head.y) < 0.0005 &&
        eyes.every((v, i) => Math.abs(v - eyesTarget[i]) < 0.0005);
      if (settled) {
        head = { ...headTarget };
        eyes = [...eyesTarget];
      }
      draw();
      if (!settled) raf = requestAnimationFrame(frame);
      else last = 0;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const init = () => {
      if (disposed || renderer || !image.complete || !image.naturalWidth) return;
      renderer = createWebGLRenderer(host, image, config) ?? createCanvasRenderer(host, image, config);
      if (!renderer) return;
      host.dataset.renderer = renderer.kind;
      renderer.canvas.addEventListener('webglcontextlost', (e) => {
        e.preventDefault();
        if (disposed) return; // our own dispose() also loses the context
        renderer?.dispose();
        renderer = createCanvasRenderer(host, image, config);
        if (renderer) host.dataset.renderer = renderer.kind;
        draw();
      });
      draw();
      setReady(true);
    };

    const neutral = (immediate = false) => {
      headTarget = { x: 0, y: 0 };
      eyesTarget = [0, 0, 0, 0];
      if (immediate) {
        cancelAnimationFrame(raf);
        raf = 0;
        last = 0;
        head = { x: 0, y: 0 };
        eyes = [0, 0, 0, 0];
        draw();
      } else schedule();
    };

    const lookAt = (x: number, y: number) => {
      if (pausedRef.current || !visible || document.hidden || !renderer) return;
      const box = host.getBoundingClientRect();
      headTarget = headGazeAt(x, y, box, config);
      eyesTarget = eyesGazeAt(x, y, box, config);
      schedule();
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') lookAt(e.clientX, e.clientY);
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') touchStart = { x: e.clientX, y: e.clientY };
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType === 'touch' && touchStart && Math.hypot(e.clientX - touchStart.x, e.clientY - touchStart.y) < 12) {
        lookAt(e.clientX, e.clientY);
      }
      touchStart = null;
    };
    const onLeave = () => neutral();
    const onHidden = () => document.hidden && neutral(true);
    const onBlur = () => neutral();

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onHidden);
    window.addEventListener('blur', onBlur);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) neutral(true);
    });
    io.observe(host);
    const ro = new ResizeObserver(() => {
      renderer?.resize();
      draw();
    });
    ro.observe(host);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onReduced = (e: MediaQueryListEvent) => e.matches && setPaused(true);
    reduced.addEventListener('change', onReduced);

    const pauseWatcher = () => pausedRef.current && neutral(true);
    host.addEventListener('head:pause', pauseWatcher);

    if (image.complete) init();
    else image.addEventListener('load', init, { once: true });

    return () => {
      disposed = true;
      image.removeEventListener('load', init);
      cancelAnimationFrame(raf);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onHidden);
      window.removeEventListener('blur', onBlur);
      reduced.removeEventListener('change', onReduced);
      host.removeEventListener('head:pause', pauseWatcher);
      io.disconnect();
      ro.disconnect();
      renderer?.dispose();
      renderer = null;
    };
  }, [config]);

  const toggle = () => {
    const next = !paused;
    setPaused(next);
    pausedRef.current = next;
    if (next) hostRef.current?.dispatchEvent(new Event('head:pause'));
  };

  return (
    <figure className="relative mx-auto w-full max-w-[22rem] md:max-w-[26rem]">
      <div
        ref={hostRef}
        className={`head-host relative aspect-square overflow-hidden rounded-full bg-[#181833] ${ready ? 'is-ready' : ''}`}
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={config.width}
          height={config.height}
          draggable={false}
          decoding="async"
          className="head-image absolute inset-0 h-full w-full select-none"
        />
      </div>
      <figcaption className="mt-4 flex items-center justify-center gap-3 text-sm text-[var(--mute)]">
        <span aria-live="polite">
          {paused ? t('hero.headPaused') : coarse ? t('hero.headHintTouch') : t('hero.headHint')}
        </span>
        <button
          type="button"
          onClick={toggle}
          aria-pressed={paused}
          aria-label={paused ? t('hero.headResume') : t('hero.headPause')}
          title={paused ? t('hero.headResume') : t('hero.headPause')}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
        </button>
      </figcaption>
    </figure>
  );
};

export default FollowHead;
