import { AnimatedGameObject } from "../entities/gameObject/AnimatedGameObject";
import { IBaseGameObject } from "../entities/gameObject/BaseGameObject";
import { Tree } from "../entities/structure/Tree";
import { generateRandomNumber } from "./algorithms/utils";

type GameObjectCtor = new (
    x: number,
    y: number,
    width: number,
    height: number
  ) => AnimatedGameObject | Tree;

  export function spawnGameObject(Ctor: GameObjectCtor, count: number): void {
    for (let i = 0; i < count; i++) {
      const randomX = generateRandomNumber(-1000, 1000);
      const randomY = generateRandomNumber(-1000, 1000);
      new Ctor(randomX, randomY, 24 * 4, 24 * 4);
    }
  }