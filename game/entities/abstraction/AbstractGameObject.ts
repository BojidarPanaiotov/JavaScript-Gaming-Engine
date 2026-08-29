import { SpriteSheet } from "../classes/SpriteSheet";
import { SquareCollider } from "../classes/SquareCollider";
import { ICollider } from "./AbstractCollider";

export interface IGameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  collider?: ICollider;
  spriteSheet?: SpriteSheet;
  update(x: number, y: number): void;
  render(): void;
  destroy(): boolean;
  animate(): void;
  flip(): void;
}

export abstract class AbstractGameObject implements IGameObject {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public spriteSheet?: SpriteSheet;
  public collider?: ICollider;
  protected mirrored: boolean = false;

  constructor(
    x: number, 
    y: number, 
    width: number, 
    height: number, 
    spriteSheet?: SpriteSheet
) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    if (spriteSheet) {
      this.spriteSheet = spriteSheet;
    }
    this.collider = new SquareCollider(x, y, width, height, this);
    game.gameObjects.push(this);
  }

  abstract render(): void
  abstract update(x: number, y: number): void
  abstract animate(): void

  destroy(): boolean {
    const index = game.gameObjects.indexOf(this);
    if (index === -1) {
      return false;
    }
  
    game.gameObjects.splice(index, 1);
    return true;
  }
  
  flip(): void {
    if (!this.mirrored) {
      return;
    }

    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;

    game.ctx.translate(centerX, centerY);
    game.ctx.scale(-1, 1);
    game.ctx.translate(-centerX, -centerY);
  }
}