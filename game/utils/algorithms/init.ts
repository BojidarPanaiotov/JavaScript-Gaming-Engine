import { Game } from "../../entities/classes/Game";
import { SpriteSheet } from "../../entities/classes/SpriteSheet";

function initAnimationClips() {
  const animationClips = {
    dino: {
      idle: { from: 0, to: 3, fps: 6 },
      walk: { from: 4, to: 7, fps: 6 },
      run: { from: 8, to: 11, fps: 6 },
      attack: { from: 12, to: 15, fps: 6 },
    }
  }

  return animationClips;
}

export type AnimationClips = ReturnType<typeof initAnimationClips>;

function initSpriteSheets() {
  const spriteSheets = {
    dino: {
      blue: new SpriteSheet('./game/assets/dino/blue', true, 24),
      green: new SpriteSheet('./game/assets/dino/green', true, 24),
      red: new SpriteSheet('./game/assets/dino/red', true, 24),
      yellow: new SpriteSheet('./game/assets/dino/yellow', true, 24),
    },
    enemy: new SpriteSheet('./game/assets/enemy/enemy.png', true, 24),
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