import { IBaseGameObject } from "../gameObject/BaseGameObject";

export interface IBaseCollider {
  gameObject: IBaseGameObject;
  collides(obj: IBaseGameObject): boolean;
  collidesAny(objs: IBaseGameObject[]): IBaseGameObject[];
  renderBorder(): void;
}

export abstract class BaseCollider implements IBaseCollider {
  public gameObject: IBaseGameObject;

  constructor(gameObject: IBaseGameObject) {
    this.gameObject = gameObject;
  }

  abstract collides(obj: IBaseGameObject): boolean;

  abstract collidesAny(objs: IBaseGameObject[]): IBaseGameObject[];

  abstract renderBorder(): void;
}