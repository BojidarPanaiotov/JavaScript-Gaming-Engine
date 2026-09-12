import { AnimatedGameObject, AnimationKey } from "../gameObject/AnimatedGameObject";
import { Health, renderHealth } from "../interfaces/Health";
import { ICollectable } from "../interfaces/Collect";
import { Pistol } from "../items/Pistol";
import { SpriteSheet } from "../sprites/SpriteSheet";

const animationClips = {
    idle: { from: 0, to: 0, fps: 0 },
    static: { from: 0, to: 0, fps: 0 },
    staticUp: { from: 4, to: 4, fps: 0 },
    staticLeft: { from: 6, to: 6, fps: 0 },
    staticDown: { from: 0, to: 0, fps: 0 },
    staticRight: { from: 2, to: 2, fps: 0 },
    walkUp: { from: 24, to: 31, fps: 10 },
    walkDown: { from: 8, to: 15, fps: 10 },
    walkLeft: { from: 32, to: 39, fps: 10 },
    walkRight: { from: 16, to: 23, fps: 10 },
};

const spriteSheet = new SpriteSheet('./game/assets/orange-demon', true, 40, 8);

export class Player extends AnimatedGameObject implements Health {
  private _health: number = 100;
  maxHealth: number = 100;
  items: ICollectable[] = [];

  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height, animationClips, spriteSheet);
  }

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
    if (x > 0) {
      animation = 'walkRight';
    } else if (x < 0) {
      animation = 'walkLeft';
    } else if (y < 0) {
      animation = 'walkUp';
    } else if (y > 0) {
      animation = 'walkDown';
    }

    if (this.health <= 0) {
      animation = "die";
    }

    super.update(x, y, degrees, animation);
  }

  render(ctx: CanvasRenderingContext2D): void {
    super.render(ctx);
    renderHealth(ctx, this);
    this.renderItems(ctx);
  }

  renderItems(ctx: CanvasRenderingContext2D): void {
    this.items.forEach(item => {
      const pistol = item as Pistol;
      console.log(this.x, this.y)
      pistol.update(this.x + 50, this.y + 50, 0, "static");
      pistol.collider.renderBorder();
      pistol.tick(ctx);
    });
  }
}
