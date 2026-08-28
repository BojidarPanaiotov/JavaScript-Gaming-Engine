import { SpriteSheet } from "./game/entities/classes/SpriteSheet";
import { Game } from "./game/entities/classes/Game";
import { Dino } from "./game/entities/classes/Dino";
import { Controller } from "./game/entities/classes/Controller";

const game = new Game();
globalThis.game = game;
game.start();

const speed = 5;
const size = 96;
const dinoSpriteSheet = new SpriteSheet('./game/assets/dino-walk.png', true);
const dino = new Dino(0, 0, size, dinoSpriteSheet);
const dino2 = new Dino(100, 100, size, dinoSpriteSheet);
const controller = new Controller(dino);

function loop() {
  controller.activate(speed);
  game.clear();

  dino.render();
  dino.collider.renderBorder();
  dino2.render();
  dino2.collider.renderBorder();

  const collides = dino.collider.collides(dino2);
  if (collides) {
    console.log('Collides');
  }

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
