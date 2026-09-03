import { Game } from "../../entities/classes/Game";
import { SpriteSheet } from "../../entities/classes/SpriteSheet";

function initAnimationClips() {
  const animationClips = {
    dino: {
      idle: { from: 0, to: 3, fps: 6 },
      walk: { from: 4, to: 7, fps: 6 },
      run: { from: 8, to: 11, fps: 6 },
      attack: { from: 12, to: 15, fps: 6 },
    },
    pistol: {
      idle: { from: 0, to: 0, fps: 0 },
      fire: { from: 0, to: 11, fps: 60, loop: false },
    },
    bullet: {
      idle: { from: 0, to: 0, fps: 0 },
      fire: { from: 0, to: 7, fps: 30, },
    }
  }

  return animationClips;
}

function initSpriteSheets() {
  const spriteSheets = {
    dino: new SpriteSheet('./game/assets/dino-walk.png', true, 24, 24),
    heart: new SpriteSheet('./game/assets/heart.png', true, 16, 16),
    pistol: new SpriteSheet('./game/assets/pistol.png', true, 64, 32),
    bullet: new SpriteSheet('./game/assets/bullet.png', true, 64, 32),
  }

  return spriteSheets;
}

export function init() {
  const game = new Game();
  globalThis.game = game;
  globalThis.spriteSheets = initSpriteSheets();
  globalThis.animationClips = initAnimationClips();
  game.start();
}