import { BaseGameObject, IBaseGameObject } from "./BaseGameObject";
import { ISpriteSheet } from "../../classes/SpriteSheet";

type AnimationClip = {
  from: number;
  to: number;
  fps: number;
  loop?: boolean;
};

export type AnimationMap = {
  idle: AnimationClip;
  walk?: AnimationClip;
  jump?: AnimationClip;
  fall?: AnimationClip;
  die?: AnimationClip;
};

export type AnimationKey = "idle" | "walk" | "jump" | "fall" | "die";

export interface IAnimatedGameObject extends IBaseGameObject {
  animations: AnimationMap;
  currentAnimation: AnimationKey;
  spriteSheet: ISpriteSheet;
  mirrored: boolean;
  frame: number;
  lastTimeFrameChanged: number;
  animate(): void;
  tick(ctx: CanvasRenderingContext2D): void;
}

export abstract class AnimatedGameObject extends BaseGameObject 
implements IAnimatedGameObject {
  protected _animations: AnimationMap;
  protected _currentAnimation: AnimationKey;
  protected _spriteSheet: ISpriteSheet;
  protected _mirrored: boolean = false;
  protected _frame: number = 0;
  protected _lastTimeFrameChanged: number = 0;
  public rotationInDegrees: number = 0;

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
    this._currentAnimation = "idle";
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

  get mirrored(): boolean {
    return this._mirrored;
  }

  get frame(): number {
    return this._frame;
  }

  get lastTimeFrameChanged(): number {
    return this._lastTimeFrameChanged;
  }

  update(x: number, y: number): void {
    super.update(x, y);

    if (x < 0) {
      this._mirrored = true;
    } else if (x > 0) {
      this._mirrored = false;
    }
  }
  
  render(ctx: CanvasRenderingContext2D, showCenterOrigin: boolean = false): void {
    if (!this.spriteSheet) {
      return;
    }

    const bitmap = this.spriteSheet.frames[this.frame];
    if (!bitmap) {
      return;
    }

    const { x: centerX, y: centerY } = this.#getCenterOriginCoordinates(ctx);

    ctx.save();
    ctx.imageSmoothingEnabled = false;

    // 1. Flip the image horizontally
    if (this.mirrored) {
      ctx.translate(centerX, centerY);
      ctx.scale(-1, 1);
      ctx.translate(-centerX, -centerY);
    }

    // 2. Draw the image
    this.#rotateObject(ctx);
    ctx.drawImage(bitmap, this.x, this.y, this.width, this.height);
    ctx.restore();

    // 3. Draw the center origin
    if (showCenterOrigin) {
      ctx.beginPath();
      ctx.fillStyle = "red";
      ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }
  }

  animate(): void {
    const clip = this.animations[this.currentAnimation];

    if (!clip) return;

    const isOutOfRange = this.frame < clip.from || this.frame > clip.to;

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
    if (clip.loop === false && this.currentAnimation === "die") {
      this.destroy();
      return;
    }

    // 5. Reset the frame if the animation is looping
    this._frame = clip.from;
    this._lastTimeFrameChanged = performance.now();
  }

  tick(ctx: CanvasRenderingContext2D): void {
    this.animate();
    this.render(ctx, true);
  }

  #getCenterOriginCoordinates(ctx: CanvasRenderingContext2D): { x: number, y: number } {
    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;

    return { x: centerX, y: centerY };
  } 

  #rotateObject (ctx: CanvasRenderingContext2D): void {
    const { x: centerX, y: centerY } = this.#getCenterOriginCoordinates(ctx);
    ctx.translate(centerX, centerY);
    ctx.rotate(this.rotationInDegrees * Math.PI / 180);
    ctx.translate(-centerX, -centerY);
  }
}