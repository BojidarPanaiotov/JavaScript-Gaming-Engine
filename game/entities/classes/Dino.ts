import { AbstractGameObject } from "../abstraction/AbstractGameObject";

const animations = {
  idle: { from: 0, to: 3, fps: 6 },
  walk: { from: 4, to: 7, fps: 6 },
  run: { from: 8, to: 11, fps: 6 },
  attack: { from: 12, to: 15, fps: 6 },
};

type DinoAnimation = keyof typeof animations;

export class Dino extends AbstractGameObject {
  #currentAnimation: DinoAnimation = 'idle';
  #frame = 0;
  #lastTimeFrameChanged = 0;

  update(x: number, y: number): void {
    const doesMoved = x !== 0 || y !== 0;

    if (x < 0) {
      this.mirrored = true;
    } else if (x > 0) {
      this.mirrored = false;
    }

    this.#currentAnimation = doesMoved ? 'walk' : 'idle';
    this.x += x;
    this.y += y;
  }

  animate(): void {
    const clip = animations[this.#currentAnimation];
    const isOutOfRange = this.#frame < clip.from || this.#frame > clip.to;

    if (isOutOfRange) {
      this.#frame = clip.from;
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

  render(): void {
    if (!this.spriteSheet) {
      return;
    }

    const bitmap = this.spriteSheet.frames[this.#frame];
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
