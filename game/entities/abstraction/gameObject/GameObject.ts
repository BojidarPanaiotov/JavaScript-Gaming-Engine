import { ICollider } from "../AbstractCollider";
import { Collider } from "../../classes/Collider";

export interface IGameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  collider?: ICollider;
  update(x: number, y: number): void;
  render(ctx: CanvasRenderingContext2D): void;
  destroy(): boolean;
}

export abstract class GameObject implements IGameObject {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public collider?: ICollider;

  constructor(
    x: number, 
    y: number, 
    width: number, 
    height: number
) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.collider = new Collider(this);

    game.gameObjects.push(this);
  }

  abstract render(ctx: CanvasRenderingContext2D): void

  abstract destroy(): boolean

  update(x: number, y: number): void {
    this.x += x;
    this.y += y;
  }

}
