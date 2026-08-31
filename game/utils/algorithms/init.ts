import { Game } from "../../entities/classes/Game";
import { SpriteSheet } from "../../entities/classes/SpriteSheet";

function initSpriteSheets() {
  const spriteSheets = {
    dino: new SpriteSheet('./game/assets/dino-walk.png', true, 24, 24),
  }

  return spriteSheets;
}

export function init() {
  const game = new Game();
  globalThis.game = game;
  globalThis.spriteSheets = initSpriteSheets();
  game.start();
}