import { AnimatedGameObject } from "../abstraction/gameObject/AnimatedGameObject";

export class Dino extends AnimatedGameObject {
  update(x: number, y: number): void {
    const doesMoved = x !== 0 || y !== 0;

    if (x < 0) {
      this.mirrored = true;
    } else if (x > 0) {
      this.mirrored = false;
    }

    this.currentAnimation = doesMoved ? 'walk' : 'idle';
    this.x += x;
    this.y += y;
  }

  render(): void {
    if (!this.spriteSheet) {
      return;
    }

    const bitmap = this.spriteSheet.frames[this.frame];
    if (!bitmap) {
      return;
    }

    game.ctx.save();
    game.ctx.imageSmoothingEnabled = false;
    this.flip();
    game.ctx.drawImage(bitmap, this.x, this.y, this.width, this.height);
    game.ctx.restore();
  }
}
