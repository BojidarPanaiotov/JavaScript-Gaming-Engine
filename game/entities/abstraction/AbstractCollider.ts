import { AbstractGameObject, IGameObject } from "./AnimatedGameObject";

export interface ICollider {
  x: number;
  y: number;
  width: number;
  height: number;
  currentGameObject: IGameObject;
  renderBorder(): void;
  collideSingle(obj: IGameObject): boolean;
}

export abstract class AbstractCollider implements ICollider {
  public x;
  public y;
  public width;
  public height;
  public currentGameObject: IGameObject;

  constructor(x: number, y: number, width: number, height: number, gameObject: IGameObject) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.currentGameObject = gameObject;
  }

  static renderAllBorders(): void {
    game.gameObjects.forEach(obj => {
      obj.collider.renderBorder();
    });
  }

  abstract renderBorder(): void;
  abstract collideSingle(obj: IGameObject): boolean;
}