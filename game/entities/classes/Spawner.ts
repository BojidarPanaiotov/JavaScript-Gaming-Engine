import { generateRandomNumber } from "../../utils/algorithms/utils";
import { AbstractGameObject } from "../abstraction/gameObject/AnimatedGameObject";
import { SpriteSheet } from "./SpriteSheet";

export type GameObjectCtor<T extends AbstractGameObject> = new (
  x: number,
  y: number,
  width: number,
  height: number,
  spriteSheet?: SpriteSheet,
) => T;

export class Spawner<T extends AbstractGameObject> {
  #spawnedObjects: T[] = [];

  constructor(
    private readonly Ctor: GameObjectCtor<T>,
    private readonly size: number,
    private readonly spriteSheet?: SpriteSheet,
    count: number = 1
  ) {
    this.#spawnedObjects = this.#create(count);
  }

  spawn(): void {
    this.#render();
  }

  #create(count: number): T[] {
    const spawned: T[] = [];

    for (let i = 0; i < count; i++) {
      const x = generateRandomNumber(0, game.canvas.width - this.size);
      const y = generateRandomNumber(0, game.canvas.height - this.size);
      spawned.push(new this.Ctor(x, y, this.size, this.size, this.spriteSheet));
    }

    return spawned;
  }

  #render(): void {
    this.#spawnedObjects.forEach(object => {
      object.render();
    });
  }
}
