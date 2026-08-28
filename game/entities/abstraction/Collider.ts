import { GameObject } from "./GameObject";

export abstract class Collider {
  public x;
  public y;
  public size;
  public currentGameObject: GameObject;

  constructor(x: number, y: number, size: number, gameObject: GameObject) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.currentGameObject = gameObject;
  }

  abstract renderBorder(): void;
  abstract collides(obj: GameObject): boolean;
}