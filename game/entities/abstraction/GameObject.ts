import { SpriteSheet } from "../classes/SpriteSheet";

export type Animations = 'idle' | 'walk' | 'run' | 'attack'

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
  abstract update(): void
  abstract animate(animation: Animations): void
}