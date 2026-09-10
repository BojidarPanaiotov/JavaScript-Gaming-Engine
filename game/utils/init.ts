import { Game } from "../entities/game/Game";
import { SpriteSheet } from "../entities/sprites/SpriteSheet";

function initAnimationClips() {
  const animationClips = {
    player: {
      idle: { from: 0, to: 0, fps: 0 },
      up: { from: 4, to: 4, fps: 0 },
      left: { from: 6, to: 6, fps: 0 },
      down: { from: 0, to: 0, fps: 0 },
      right: { from: 2, to: 2, fps: 0 },
    },
    pistol: {
      idle: { from: 0, to: 7, fps: 6 },
      static: { from: 2, to: 2, fps: 1 },
    },
    coin: {
      idle: { from: 0, to: 7, fps: 6 }
    }
  }

  return animationClips;
}

export type AnimationClips = ReturnType<typeof initAnimationClips>;

function initSpriteSheets() {
  const spriteSheets = {
    player: new SpriteSheet('./game/assets/orange-demon', true, 8),
    pistol: new SpriteSheet('./game/assets/pistol', true, 8),
    coin: new SpriteSheet('./game/assets/coin', true, 8),
  }

  return spriteSheets;
}

export type SpriteSheets = ReturnType<typeof initSpriteSheets>;

export function init() {
  const game = new Game();
  globalThis.game = game;
  globalThis.spriteSheets = initSpriteSheets() as SpriteSheets;
  globalThis.animationClips = initAnimationClips() as AnimationClips;
  game.start();
}