import { AnimatedGameObject, AnimationMap } from "../abstraction/gameObject/AnimatedGameObject";
import { ISpriteSheet } from "./SpriteSheet";

export class Dino extends AnimatedGameObject {
  update(x: number, y: number): void {
    const isMoving = x !== 0 || y !== 0;

    super.update(x, y);
    this._currentAnimation = isMoving ? "walk" : "idle";
  }

  destroy(): boolean {
    return false;
  }
}
