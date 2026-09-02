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
  flip(): void;
}

export abstract class AnimatedGameObject extends GameObject 
implements IAnimatedGameObject {
  animations: Animations;
  currentAnimation: string = 'idle';
  frame = 0;
  protected mirrored: boolean = false;
  #lastTimeFrameChanged = 0;
  spriteSheet: ISpriteSheet;

  constructor(
    x: number, 
    y: number, 
    width: number, 
    height: number, 
    animations: Animations,
    spriteSheet: ISpriteSheet,
    collider?: boolean
  ) {
    super(x, y, width, height, collider);
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

  animate(): void {
    const clip = this.animations[this.currentAnimation];
    const isOutOfRange = this.frame < clip.from || this.frame > clip.to;

    if (isOutOfRange) {
      this.frame = clip.from;
    }

    const now = performance.now();
    const timeSinceLastFrameChanged = now - this.#lastTimeFrameChanged;
    const timeToNextFrame = 1000 / clip.fps;

    if (timeSinceLastFrameChanged >= timeToNextFrame) {
      this.frame++;
      if (this.frame > clip.to) {
        if (clip.loop === false) {
          this.currentAnimation = "idle";
          this.frame = this.animations.idle?.from ?? clip.from;
        } else {
          this.frame = clip.from;
        }
      }
      this.#lastTimeFrameChanged = now;
    }
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