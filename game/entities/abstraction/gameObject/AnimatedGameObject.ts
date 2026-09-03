import { GameObject, IGameObject } from "./GameObject";
import { ISpriteSheet } from "../../classes/SpriteSheet";

type AnimationClip = {
  from: number;
  to: number;
  fps: number;
  loop?: boolean;
}

export type Animations = Record<string, AnimationClip>;

export interface IAnimatedGameObject extends IGameObject {
  currentAnimation: string;
  animate(): void;
}

export abstract class AnimatedGameObject extends GameObject 
implements IAnimatedGameObject {
  animations: Animations;
  currentAnimation: string = 'idle';
  frame = 0;
  spriteSheet: ISpriteSheet;
  protected mirrored: boolean = false;
  #lastTimeFrameChanged = 0;

  constructor(
    x: number, 
    y: number, 
    width: number, 
    height: number, 
    animations: Animations,
    spriteSheet: ISpriteSheet
  ) {
    super(x, y, width, height);
    this.animations = animations;
    this.spriteSheet = spriteSheet;
  }

  update(x: number, y: number): void {
    super.update(x, y);

    if (x < 0) {
      this.mirrored = true;
    } else if (x > 0) {
      this.mirrored = false;
    }
  }
  
  render(ctx: CanvasRenderingContext2D): void {
    if (!this.spriteSheet) {
      return;
    }

    const bitmap = this.spriteSheet.frames[this.frame];
    if (!bitmap) {
      return;
    }

    ctx.save();
    ctx.imageSmoothingEnabled = false;
    this.#flip(ctx);
    ctx.drawImage(bitmap, this.x, this.y, this.width, this.height);
    ctx.restore();
  }

  animate(): void {
    const clip = this.animations[this.currentAnimation];
    const isOutOfRange = this.frame < clip.from || this.frame > clip.to;

    if (isOutOfRange) {
      this.frame = clip.from;
    }

    const now = performance.now();
    const timeSinceLastFrameChanged = now - this.#lastTimeFrameChanged;
    const timeToNextFrame = 1000 / clip.fps;
    const shouldChangeFrame = timeSinceLastFrameChanged >= timeToNextFrame

    if (shouldChangeFrame) {
      this.frame++;

      if (this.frame > clip.to) {
        if (clip.loop === false) {
          this.currentAnimation = "idle";
          this.frame = this.animations.idle.from ?? clip.from;
        } else {
          this.frame = clip.from;
        }
      }
      this.#lastTimeFrameChanged = now;
    }
  }

  #flip(ctx: CanvasRenderingContext2D): void {
    if (!this.mirrored) {
      return;
    }

    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;

    ctx.translate(centerX, centerY);
    ctx.scale(-1, 1);
    ctx.translate(-centerX, -centerY);
  }
}