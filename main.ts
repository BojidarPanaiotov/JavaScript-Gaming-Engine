import { SpriteSheet } from "./game/entities/classes/SpriteSheet";
import { Game } from "./game/entities/classes/Game";
import { Dino } from "./game/entities/classes/Dino";
import { Spawner } from "./game/entities/classes/Spawner";
import { generateRandomNumber } from "./game/utils/algorithms/utils";

const game = new Game();
globalThis.game = game;
game.start();

const speed = 5;
const size = 96;
const dinoSpriteSheet = new SpriteSheet('./game/assets/dino-walk.png', true);
const spawner = new Spawner(Dino, size, dinoSpriteSheet);

function loop() {
  game.clear();
  spawner.spawn();
  game.gameObjects.forEach(gameObject => {
    gameObject.collider.renderBorder();
  });
  requestAnimationFrame(loop);
}


requestAnimationFrame(loop);
