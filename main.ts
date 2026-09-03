import { init } from 	"./game/utils/algorithms/init";

init();

function loop() {
  game.clear();

  requestAnimationFrame(loop);
}


requestAnimationFrame(loop);
