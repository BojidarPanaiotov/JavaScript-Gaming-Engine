import { AnimatedGameObject } from "./AnimatedGameObject"

export interface IProjectable {
  active: boolean;
}

export abstract class Projectile extends AnimatedGameObject
implements IProjectable {
  active: boolean = false;

  update(x: number, y: number): void {
    if (!this.active) {
      return;
    }

    super.update(x, y);

    if (this.x > game.canvas.width) {
      this.active = false;
    }
  }

  render(): void {
    if (!this.active) return;
    super.render();
  }
}