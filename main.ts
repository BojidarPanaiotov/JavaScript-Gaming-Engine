import { SpriteSheet } from "./game/entities/classes/SpriteSheet";
import { Game } from "./game/entities/classes/Game";
import { Dino } from "./game/entities/classes/Dino";

const game = new Game();
globalThis.game = game;
game.start();

const dino = new Dino(0, 0, new SpriteSheet('./game/assets/dino-walk.png', true));
const dino2 = new Dino(24, 24, new SpriteSheet('./game/assets/dino-walk.png', true));
const dino3 = new Dino(48, 48, new SpriteSheet('./game/assets/dino-walk.png', true));
const dino4 = new Dino(72, 72, new SpriteSheet('./game/assets/dino-walk.png', true));
function loop() {
  game.clear();
  dino.animate('idle');
  dino2.animate('walk');
  dino3.animate('run');
  dino4.animate('attack');
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
