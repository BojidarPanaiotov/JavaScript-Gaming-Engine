import { GameObject } from "../abstraction/AnimatedGameObject";
import { SpriteSheet } from "./SpriteSheet";

export class Square extends GameObject {
  render(): void {
    game.ctx.fillStyle = 'red';
    game.ctx.fillRect(this.x, this.y, 24, 24);
  }

  destroy(): boolean {
    game.ctx.clearRect(this.x, this.y, 24, 24);
    return true;
  }
}