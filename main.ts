import { Dino } from "./game/entities/classes/Dino";
import { Controller } from "./game/entities/classes/Controller";

init();

const size = 24 * 9;

const dinoRed = new Dino(50, 50, size, size, animationClips.dino, spriteSheets.dino.red);
const dinoGreen = new Dino(300, 50, size, size, animationClips.dino, spriteSheets.dino.green);
const dinoBlue = new Dino(50, 300, size, size, animationClips.dino, spriteSheets.dino.blue);
const dinoYellow = new Dino(300, 300, size, size, animationClips.dino, spriteSheets.dino.yellow);
const controller = new Controller([dinoRed, dinoGreen, dinoBlue, dinoYellow]);

function loop() {
  game.clear();
  controller.move(10);
  dinoRed.render(game.ctx, true);
  dinoGreen.render(game.ctx, true);
  dinoBlue.render(game.ctx, true);
  dinoYellow.render(game.ctx, true);
  dinoRed.animate();
  dinoGreen.animate();
  dinoBlue.animate();
  dinoYellow.animate();

  requestAnimationFrame(loop);
}


requestAnimationFrame(loop);
