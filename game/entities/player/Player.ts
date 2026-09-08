import { AnimatedGameObject, AnimationKey } from "../gameObject/AnimatedGameObject";
import { Health, renderHealth } from "../interfaces/Health";
import { ICollectable } from "../interfaces/Collect";
import { Pistol } from "../items/Pistol";

export class Player extends AnimatedGameObject implements Health {
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
    this.renderItems(ctx);
  }

  renderItems(ctx: CanvasRenderingContext2D): void {
    this.items.forEach(item => {
      const pistol = item as Pistol;
      console.log(this.x, this.y)
      pistol.update(this.x + 50, this.y + 50, 0, "static");
      pistol.collider.renderBorder(ctx);
      pistol.tick(ctx);
    });
  }
}
