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
}
