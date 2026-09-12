import { AnimatedGameObject } from "../gameObject/AnimatedGameObject";
import { SpriteSheet } from "../sprites/SpriteSheet";

const animationClips = {
  idle: { from: 0, to: 0, fps: 0 }
};

const spriteSheet = new SpriteSheet('./game/assets/tile-map', true, 4, 2);

export class WalkingPath extends AnimatedGameObject {
  constructor(
    x: number, 
    y: number, 
  ) {
    super(x, y, animationClips, spriteSheet);
  }
}