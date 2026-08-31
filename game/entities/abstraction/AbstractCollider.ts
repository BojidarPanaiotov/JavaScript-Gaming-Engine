import { IGameObject } from "./gameObject/GameObject";
import { algorithms } from "../../utils/algorithms/aabb";

export interface ICollider {
  gameObject: IGameObject;
  collides(obj: IGameObject): boolean;
  collidesAny(objs: IGameObject[]): IGameObject[];
  renderBorder(): void;
}

export abstract class BaseCollider implements ICollider {
  public gameObject: IGameObject;

  constructor(gameObject: IGameObject) {
    this.gameObject = gameObject;
  }

  static renderAllBorders(): void {
    game.gameObjects.forEach(obj => {
      obj.collider?.renderBorder();
    });
  }

  collides(obj: IGameObject): boolean {
    return algorithms.aabb(this.gameObject, obj);
  }

  collidesAny(objs: IGameObject[]): IGameObject[] {
    let result: IGameObject[] = [];

    objs.some(obj => {
      if (this.gameObject === obj) {
        return;
      }
      const collides = algorithms.aabb(this.gameObject, obj);
      if (collides) {
        result.push(obj);
      }
    })

    return result;
  }

  renderBorder(): void {
    game.ctx.strokeStyle = 'blue';
    game.ctx.lineWidth = 1;
    game.ctx.strokeRect(this.gameObject.x, this.gameObject.y, this.gameObject.width, this.gameObject.height);
  }
}