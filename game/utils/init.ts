import { Game } from "../entities/game/Game";
import { SpriteSheet } from "../entities/sprites/SpriteSheet";

function initAnimationClips() {
  const animationClips = {
    player: {
      idle: { from: 0, to: 0, fps: 0 }, // Default Animation
      static: { from: 0, to: 0, fps: 0 }, // Default Animation
      staticUp: { from: 4, to: 4, fps: 0 },
      staticLeft: { from: 6, to: 6, fps: 0 },
      staticDown: { from: 0, to: 0, fps: 0 },
      staticRight: { from: 2, to: 2, fps: 0 },
      walkUp: { from: 24, to: 31, fps: 10 },
      walkDown: { from: 8, to: 15, fps: 10 },
      walkLeft: { from: 32, to: 39, fps: 10 },
      walkRight: { from: 16, to: 23, fps: 10 },
    },
    pistol: {
      idle: { from: 0, to: 7, fps: 6 },
      static: { from: 2, to: 2, fps: 1 },
    },
    coin: {
      idle: { from: 0, to: 7, fps: 6 }
    },
    autumnTree: {
      idle: { from: 0, to: 15, fps: 10 }
    }
  }

  return animationClips;
}

export type AnimationClips = ReturnType<typeof initAnimationClips>;

function initSpriteSheets() {
  const spriteSheets = {
    player: new SpriteSheet('./game/assets/orange-demon', true, 40, 8),
    pistol: new SpriteSheet('./game/assets/pistol', true, 8),
    coin: new SpriteSheet('./game/assets/coin', true, 8),
    autumnTree: new SpriteSheet('./game/assets/autumn-tree', true, 16, 16),
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