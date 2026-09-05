import { IBaseGameObject } from "../abstraction/gameObject/BaseGameObject";

export class Camera {
  x = 0;
  y = 0;

  follow(target: IBaseGameObject): void {
    this.x = target.x + target.width / 2 - game.canvas.width / 2;
    this.y = target.y + target.height / 2 - game.canvas.height / 2;
  }

  apply(ctx: CanvasRenderingContext2D): void {
    ctx.translate(-this.x, -this.y);
  }

  reset(ctx: CanvasRenderingContext2D): void {
    ctx.translate(this.x, this.y);
  }
}
