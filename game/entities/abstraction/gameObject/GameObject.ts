import { ICollider } from "../AbstractCollider";
import { Collider } from "../../classes/Collider";
export interface IGameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  update(x: number, y: number): void;
  render(): void;
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
    height: number,
    collider?: boolean
) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    if (collider) {
      this.collider = new Collider(this);
    }

    game.gameObjects.push(this);
  }

  abstract render(): void
  abstract update(x: number, y: number): void

  destroy(): boolean {
    const index = game.gameObjects.indexOf(this);

    if (index === -1) {
      return false;
    }
  
    game.gameObjects.splice(index, 1);
    return true;
  }
}
