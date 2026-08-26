import { GameObject, ICoordinates } from "../GameObject";

export class Square extends GameObject {
  constructor(coordinates: ICoordinates) {
    super(coordinates);
  }

  render(multiplier: number): void {
    game.ctx.fillStyle = 'red';
    game.ctx.fillRect(this.x, this.y, multiplier, multiplier);
  }

  destroy(multiplier: number): boolean {
    game.ctx.clearRect(this.x, this.y, multiplier, multiplier);
    return true;
  }

  collides(gamingObject: GameObject): boolean {
    const otherX = gamingObject.x;
    const otherY = gamingObject.y;
    const thisX = this.x;
    const thisY = this.y;
    return otherX === thisX && otherY === thisY;
  }
}