import { Game } from "../entities/game/Game";

export function init() {
  const game = new Game();
  globalThis.game = game;
  game.start();
}