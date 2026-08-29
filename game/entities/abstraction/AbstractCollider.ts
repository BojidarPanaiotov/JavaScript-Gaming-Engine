import { GameObject } from "./GameObject";

export interface ICollider {
  x: number;
  y: number;
  size: number;
  currentGameObject: GameObject;
  renderBorder(): void;
  collideSingle(obj: GameObject): boolean;
}

export abstract class AbstractCollider implements ICollider {
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
  abstract collideSingle(obj: GameObject): boolean;
}