import { Game } from "./game/entities/classes/Game";
import { Dino } from "./game/entities/classes/Dino";

const game = new Game();
globalThis.game = game;
game.start();

const dino = new Dino('./game/assets/dino-walk.png', true);

function loop() {
  game.clear();
  dino.render();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
