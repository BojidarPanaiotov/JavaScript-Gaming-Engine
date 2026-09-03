import { AnimatedGameObject } from "./AnimatedGameObject"

export interface IProjectable {
  active: boolean;
  vx: number;
}

export abstract class Projectile extends AnimatedGameObject
implements IProjectable {
  active: boolean = false;
  vx: number = 0;

  update(): void {
    if (!this.active) return;

    super.update(this.vx, 0);

    if (this.x > game.canvas.width) {
      // TODO: Implement bullet destruction
      // this.active = false;
      // this.destroy();
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    if (!this.active) return;
    super.render(ctx);
  }
}