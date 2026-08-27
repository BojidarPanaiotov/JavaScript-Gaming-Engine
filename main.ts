import { SpriteSheet } from "./game/entities/classes/SpriteSheet";
import { Game } from "./game/entities/classes/Game";
import { Square } from "./game/entities/classes/Square";

const game = new Game();
globalThis.game = game;
game.start();

const square = new Square(0, 0);

function loop() {
  game.clear();
  square.render();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
