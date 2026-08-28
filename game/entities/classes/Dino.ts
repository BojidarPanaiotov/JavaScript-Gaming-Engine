import { Animations, GameObject } from "../abstraction/GameObject";

const animations = {
  idle: { from: 0, to: 3, fps: 6 },
  walk: { from: 4, to: 7, fps: 6 },
  run: { from: 8, to: 11, fps: 6 },
  attack: { from: 12, to: 15, fps: 6 },
};

export class Dino extends GameObject {
  #frame = 0;
  #lastTimeFrameChanged = 0;

  render(): void {
    this.animate('idle');
  }

  destroy(): boolean {
    game.ctx.clearRect(this.x, this.y, this.size, this.size);
    return true;
  }

  animate(animation: Animations): void {
    if (!this.spriteSheet) {
      return;
    }

    const clip = animations[animation];
    const isOutOfRange = this.#frame < clip.from || this.#frame > clip.to;

    if (isOutOfRange) {
      this.#frame = clip.from;
    }

    const bitmap = this.spriteSheet.frames[this.#frame];
    if (bitmap) {
      game.ctx.save();
      game.ctx.imageSmoothingEnabled = false;
      this.flip();
      game.ctx.drawImage(bitmap, this.x, this.y, this.size, this.size);
      game.ctx.restore();
    }

    const now = performance.now();
    const timeSinceLastFrameChanged = now - this.#lastTimeFrameChanged;
    const timeToNextFrame = 1000 / clip.fps;

    if (timeSinceLastFrameChanged >= timeToNextFrame) {
      this.#frame++;  
      if (this.#frame > clip.to) {
        this.#frame = clip.from;
      }
      this.#lastTimeFrameChanged = now;
    }
  }

  update(x: number, y: number): void {
    if (x < 0) {
      this.mirrored = true;
    } else if (x > 0) {
      this.mirrored = false;
    }

    this.x += x;
    this.y += y;
  }
}
