import { Dino } from "./game/entities/classes/Dino";
import { Controller } from "./game/entities/classes/Controller";
import { init } from 	"./game/utils/algorithms/init";

init();

const speed = 4;
const size = 24 * 4;

const animations = {
  idle: { from: 0, to: 3, fps: 6 },
  walk: { from: 4, to: 7, fps: 6 },
  run: { from: 8, to: 11, fps: 6 },
  attack: { from: 12, to: 15, fps:   6 },
};
const dino = new Dino(0, 0, size, size, animations, spriteSheets.dino, true);
const dino2 = new Dino(150, 150, size, size, animations, spriteSheets.dino, true);
const dino3 = new Dino(250, 250, size, size, animations, spriteSheets.dino, true);
const controller = new Controller(dino);
const dinos = [dino, dino2, dino3];

function loop() {
  game.clear();
  controller.activate(speed);

  dinos.forEach(dino => {
    dino.render();
    dino.animate();
  });

  const collides = dino.collider?.collidesAny(dinos);
  console.log(collides);

  game.gameObjects.forEach(obj => {
    obj.collider?.renderBorder();
  });

  requestAnimationFrame(loop);
}


requestAnimationFrame(loop);
