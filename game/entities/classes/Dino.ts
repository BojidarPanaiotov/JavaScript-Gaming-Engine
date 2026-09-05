import { AnimatedGameObject } from "../abstraction/gameObject/AnimatedGameObject";
import { Health, renderHealth } from "../interfaces/Health";

export class Dino extends AnimatedGameObject implements Health {
  health: number = 100;
  maxHealth: number = 100;

  update(x: number, y: number): void {
    const isMoving = x !== 0 || y !== 0;

    super.update(x, y);
    this._currentAnimation = isMoving ? "walk" : "idle";
  }

  render(ctx: CanvasRenderingContext2D, showCenterOrigin?: boolean): void {
    super.render(ctx, showCenterOrigin);
    renderHealth(ctx, this);
  }
}
