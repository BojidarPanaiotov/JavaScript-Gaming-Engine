import { BaseGameObject, IBaseGameObject } from "./BaseGameObject";
import { ISpriteSheet } from "../sprites/SpriteSheet";

type AnimationClip = {
  from: number;
  to: number;
  fps: number;
  loop?: boolean;
};

export type AnimationMap = {
  idle: AnimationClip;
  static?: AnimationClip;
  walk?: AnimationClip;
  jump?: AnimationClip;
  fall?: AnimationClip;
  die?: AnimationClip;
  right?: AnimationClip;
  left?: AnimationClip;
  up?: AnimationClip;
  down?: AnimationClip;
  walkUp?: AnimationClip;
  walkDown?: AnimationClip;
  walkLeft?: AnimationClip;
  walkRight?: AnimationClip;
  staticUp?: AnimationClip;
  staticDown?: AnimationClip;
  staticLeft?: AnimationClip;
  staticRight?: AnimationClip;
};

export type AnimationKey = 
  | "idle" 
  | "static" 
  | "walk" 
  | "jump" 
  | "fall" 
  | "die" 
  | "staticUp" | "staticDown" | "staticLeft" | "staticRight" |
  "walkUp" | "walkDown" | "walkLeft" | "walkRight";

export interface IAnimatedGameObject extends IBaseGameObject {
  animations: AnimationMap;
  currentAnimation: AnimationKey;
  spriteSheet: ISpriteSheet;
  frame: number;
  lastTimeFrameChanged: number;
  update(x: number, y: number, degrees?: number, animation?: AnimationKey): void;
  animate(): void;
  tick(ctx: CanvasRenderingContext2D): void;
}

export abstract class AnimatedGameObject extends BaseGameObject implements IAnimatedGameObject {
  protected _animations: AnimationMap;
  protected _currentAnimation: AnimationKey = "idle";
  protected _spriteSheet: ISpriteSheet;
  protected _frame: number = 0;
  protected _lastTimeFrameChanged: number = 0;
  protected _rotationInDegrees: number = 0;

  constructor(
    x: number, 
    y: number, 
    width: number, 
    height: number, 
    animations: AnimationMap,
    spriteSheet: ISpriteSheet
  ) {
    super(x, y, width, height);
    this._animations = animations;
    this._spriteSheet = spriteSheet;
  }

  get animations(): AnimationMap {
    return this._animations;
  }

  get currentAnimation(): AnimationKey {
    return this._currentAnimation;
  }

  get spriteSheet(): ISpriteSheet {
    return this._spriteSheet;
  }

  get frame(): number {
    return this._frame;
  }

  get lastTimeFrameChanged(): number {
    return this._lastTimeFrameChanged;
  }

  update(x: number, y: number, degrees: number = 0, animation: AnimationKey = "idle"): void {
    super.update(x, y);
    this._rotationInDegrees += degrees;
    this._currentAnimation = animation;
  }
  
  render(ctx: CanvasRenderingContext2D): void {
    if (!this.spriteSheet) {
      return;
    }

    const singleFrame = this.spriteSheet.frames[this._frame];
    if (!singleFrame) {
      return;
    }

    ctx.save();
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(singleFrame, this.x, this.y, this.width, this.height);
    ctx.restore();
  }

  animate(): void {
    const clip = this.animations[this._currentAnimation];

    if (!clip) return;

    const isOutOfRange = this._frame < clip.from || this._frame > clip.to;

    // 1. Reset the frame if it is out of range
    if (isOutOfRange) {
      this._frame = clip.from;
      this._lastTimeFrameChanged = performance.now();
      return;
    }

    const now = performance.now();
    
    // 2. Check if the frame should be changed
    if (now - this.lastTimeFrameChanged < 1000 / clip.fps) return;

    // 3. Increment the frame if it is not out of range
    if (this._frame < clip.to) {
      this._frame++;
      this._lastTimeFrameChanged = now;
      return;
    }

    // 4. Destroy the object if the animation is not looping and the current animation is "die"
    if (clip.loop === false && this._currentAnimation === "die") {
      this.destroy();
      return;
    }

    // 5. Reset the frame if the animation is looping
    this._frame = clip.from;
    this._lastTimeFrameChanged = performance.now();
  }

  tick(ctx: CanvasRenderingContext2D): void {
    this.animate();
    this.render(ctx);
  }
}