import { init } from "./game/utils/init";
import { Dino } from "./game/entities/classes/Dino";
import { Controller } from "./game/entities/classes/Controller";
import { Camera } from "./game/entities/classes/Camera";
import { AnimatedGameObject } from "./game/entities/abstraction/gameObject/AnimatedGameObject";
import { Debuger } from "./game/entities/classes/Debuger";
init();

const size = 24 * 4;

const dinoRed = new Dino(0, 0, size, size, animationClips.dino, spriteSheets.dino.red);
const dinoGreen = new Dino(-2000,-1100, size, size, animationClips.dino, spriteSheets.dino.green);
const dinoBlue = new Dino(0, 400, size, size, animationClips.dino, spriteSheets.dino.blue);
const dinoYellow = new Dino(400, 400, size, size, animationClips.dino, spriteSheets.dino.yellow);

const camera = new Camera();
const controller = new Controller(dinoRed);

const debuger = new Debuger();

function loop() {
  game.clear();

  controller.move(10);
  camera.follow(dinoRed);

  game.ctx.save();
  camera.apply(game.ctx);
  game.gameObjects.forEach((obj) => {
    if (obj instanceof AnimatedGameObject) {
      obj.tick(game.ctx);
    } else {
      obj.render(game.ctx);
    }
  });
  debuger.showObjectStats(dinoRed);
  
  
  debuger.showCollisionBorders();
  camera.reset(game.ctx);

  game.ctx.restore();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
