import { init } from 	"./game/utils/algorithms/init";
import { Dino } from "./game/entities/classes/Dino";

init();

const size = 24 * 4;

const dino = new Dino(0, 0, size, size, animationClips.dino, spriteSheets.dino, true);

function loop() {
  game.clear();

  dino.render(game.ctx);

  requestAnimationFrame(loop);
}


requestAnimationFrame(loop);
