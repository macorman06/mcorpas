import { HeadConfig } from '../lib/headRenderer';

/**
 * Calibrated on public/profile/avatar.webp (square, 960 px). All values in UV (0–1).
 * If the avatar image changes, re-measure the eye openings and irises.
 */
export const AVATAR_CONFIG: HeadConfig = {
  width: 960,
  height: 960,
  eyes: [
    { opening: [0.374, 0.474], openingR: [0.06, 0.027], iris: [0.381, 0.474], irisR: [0.031, 0.031], sclera: [0.3385, 0.476] },
    { opening: [0.618, 0.474], openingR: [0.06, 0.027], iris: [0.609, 0.474], irisR: [0.031, 0.031], sclera: [0.652, 0.476] },
  ],
  headCenter: [0.5, 0.5],
  headR: [0.36, 0.46],
  neckFade: [0.78, 0.9],
  yaw: 0.16,
  pitch: 0.1,
  depth: 0.2,
  irisTravel: [0.014, 0.022, 0.007],
  eyeLevel: 0.47,
};
