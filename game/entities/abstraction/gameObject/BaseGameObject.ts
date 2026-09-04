import { Collider } from "../../classes/Collider";
import { IBaseCollider } from "../collision/BaseCollider";

export interface IBaseGameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  collider: IBaseCollider;
  update(x: number, y: number): void;
  render(ctx: CanvasRenderingContext2D): void;
  destroy(): boolean;
}

export abstract class BaseGameObject implements IBaseGameObject {
  protected _x: number;
  protected _y: number;
  protected _width: number;
  protected _height: number;
  public collider: IBaseCollider;

  constructor(
    x: number, 
    y: number, 
    width: number, 
    height: number
) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this.collider = new Collider(this);

    game.gameObjects.push(this);
  }

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  public get width(): number {
    return this._width;
  }

  public get height(): number {
    return this._height;
  }

  abstract render(ctx: CanvasRenderingContext2D): void

  abstract destroy(): boolean

  update(x: number, y: number): void {
    this._x += x;
    this._y += y;
  }

}
