import { init } from "./game/utils/init";
import { Player } from "./game/entities/player/Player";
import { Controller } from "./game/entities/controls/Controller";
import { Camera } from "./game/entities/game/Camera";
import { AnimatedGameObject } from "./game/entities/gameObject/AnimatedGameObject";
import { Debuger } from "./game/entities/game/Debuger";
import { spawnGameObject, spawnTreeGameObject } from "./game/utils/spawn";
import { Coin } from "./game/entities/items/Coin";
import { Pistol } from "./game/entities/items/Pistol";
import { Tree } from "./game/entities/structure/Tree";
import { Path } from "./game/entities/structure/Path";

await init();

const player = new Player(0, 0);
player.zIndex = 2;
const camera = new Camera();
const controller = new Controller();
const debuger = new Debuger();

spawnGameObject(Coin, 10);
spawnGameObject(Pistol, 10);
spawnGameObject(Path, 10);
spawnTreeGameObject(Tree, 25);
spawnTreeGameObject(Tree, 25, 'autumn');

function loop() {
  game.clear();
  
  const move = controller.getNextMoveCoordinates(20);
  player.update(move.x, move.y);
  camera.follow(player);
  game.ctx.save();
  camera.apply(game.ctx);

  game.gameObjects.sort((a: AnimatedGameObject, b: AnimatedGameObject) => a.zIndex - b.zIndex).forEach((obj: AnimatedGameObject) => {
    obj.tick(game.ctx);
    obj.collider.renderBorder();
  });

  debuger.showObjectStats(player);
  camera.reset(game.ctx);
  game.ctx.restore();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
