import { SpriteSheet } from "./game/entities/classes/SpriteSheet";
import { Game } from "./game/entities/classes/Game";
import { Dino } from "./game/entities/classes/Dino";
import { Controller } from "./game/entities/classes/Controller";

const game = new Game();
globalThis.game = game;
game.start();

const speed = 5;
const dino = new Dino(0, 0, 24, new SpriteSheet('./game/assets/dino-walk.png', true));
const controller = new Controller(dino);

function loop() {
  controller.activate(speed);
  game.clear();
  dino.animate('idle');
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
