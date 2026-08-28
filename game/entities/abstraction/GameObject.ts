import { SpriteSheet } from "../classes/SpriteSheet";

export type Animations = 'idle' | 'walk' | 'run' | 'attack'

export abstract class GameObject {
  public x: number;
  public y: number;
  public size: number;
  public spriteSheet?: SpriteSheet;
  protected mirrored: boolean = false;

  constructor(x: number, y: number, size: number, spriteSheet?: SpriteSheet) {
    this.x = x;
    this.y = y;
    this.size = size;
    if (spriteSheet) {
      this.spriteSheet = spriteSheet;
    }
  }

  abstract render(): void
  abstract destroy(): boolean
  abstract update(x: number, y: number): void
  abstract animate(animation: Animations): void

  flip(): void {
    if (!this.mirrored) {
      return;
    }

    const centerX = this.x + this.size / 2;
    const centerY = this.y + this.size / 2;

    game.ctx.translate(centerX, centerY);
    game.ctx.scale(-1, 1);
    game.ctx.translate(-centerX, -centerY);
  }
}