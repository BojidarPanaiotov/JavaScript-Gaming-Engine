import { AnimatedGameObject } from "../entities/gameObject/AnimatedGameObject";
import { Tree, TreeType } from "../entities/structure/Tree";
import { generateRandomNumber } from "./algorithms/utils";

type GameObjectCtor = new (
    x: number,
    y: number
  ) => AnimatedGameObject;

export function spawnGameObject(Ctor: GameObjectCtor, count: number): void {
    for (let i = 0; i < count; i++) {
        const randomX = generateRandomNumber(-1000, 1000);
        const randomY = generateRandomNumber(-1000, 1000);
        new Ctor(randomX, randomY);
    }
}

type TreeGameObjectCtor = new (
    x: number,
    y: number,
    treeType: TreeType
  ) => Tree;

export function spawnTreeGameObject(Ctor: TreeGameObjectCtor, count: number, treeType: TreeType = "normal"): void {
    for (let i = 0; i < count; i++) {
        const randomX = generateRandomNumber(-1000, 1000);
        const randomY = generateRandomNumber(-1000, 1000);
        new Ctor(randomX, randomY, treeType);
    }
}