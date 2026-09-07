import { AnimatedGameObject, AnimationKey } from "../gameObject/AnimatedGameObject";
import { Health, renderHealth } from "../interfaces/Health";
import { ICollectable } from "../interfaces/Collect";

export class Dino extends AnimatedGameObject implements Health {
  private _health: number = 100;
  maxHealth: number = 100;
  items: ICollectable[] = [];

  get health(): number {
    return this._health;
  }

  set health(value: number) {
    if (value < 0) {
      this._health = 0;
    } else {
      this._health = value;
    }
  }

  update(x: number, y: number, degrees: number = 0, animation: AnimationKey = "idle"): void {
    if (this.health <= 0) {
      // TODO: Stuck when dies
      this._currentAnimation = "die";
      return;
    }

    super.update(x, y, degrees, animation);
  }

  render(ctx: CanvasRenderingContext2D, showCenterOrigin?: boolean): void {
    super.render(ctx, showCenterOrigin);
    renderHealth(ctx, this);
  }
}
