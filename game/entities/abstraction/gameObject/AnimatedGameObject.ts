import { GameObject, IGameObject } from "./GameObject";
import { ISpriteSheet } from "../../classes/SpriteSheet";

type AnimationClip = {
  from: number;
  to: number;
  fps: number;
}

type Animations = Record<string, AnimationClip>;

export interface IAnimatedGameObject extends IGameObject {
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
        this.frame = clip.from;
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