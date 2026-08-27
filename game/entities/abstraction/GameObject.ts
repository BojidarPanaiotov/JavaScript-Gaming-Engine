import { SpriteSheet } from "../classes/SpriteSheet";

export abstract class GameObject {
  public x: number;
  public y: number;
  public spriteSheet?: SpriteSheet;

  constructor(x: number, y: number, spriteSheet?: SpriteSheet) {
    this.x = x;
    this.y = y;
    if (spriteSheet) {
      this.spriteSheet = spriteSheet;
    }
  }

  abstract render(): void
  abstract destroy(): boolean
}