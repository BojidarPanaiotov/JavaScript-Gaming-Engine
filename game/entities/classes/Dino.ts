import { AnimatedGameObject } from "../abstraction/gameObject/AnimatedGameObject";
import { Health, renderHealth } from "../interfaces/Health";

export class Dino extends AnimatedGameObject implements Health {
  private _health: number = 100;
  maxHealth: number = 100;

  get health(): number {
    return this._health;
  }

  set health(value: number) {
    if (value < 0) return;

    this._health = value;
  }

  update(x: number, y: number, degrees: number = 0, animation: AnimationKey = "idle"): void {
    if (this.health <= 0) {
      animation = "die";
      return;
    }
    animation = x !== 0 || y !== 0 ? "walk" : "idle";

    super.update(x, y, degrees, animation);
  }

  render(ctx: CanvasRenderingContext2D, showCenterOrigin?: boolean): void {
    super.render(ctx, showCenterOrigin);
    renderHealth(ctx, this);
  }
}
