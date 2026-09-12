import { Game } from "../entities/game/Game";
import { SpriteSheet } from "../entities/sprites/SpriteSheet";

export async function init() {
  await SpriteSheet.whenAllReady();

  const game = new Game();
  globalThis.game = game;
  game.start();
}