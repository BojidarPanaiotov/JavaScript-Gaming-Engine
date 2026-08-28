import { GameObject } from "../abstraction/GameObject";
import { Collider } from "../abstraction/Collider";

export class SquareCollider extends Collider {
  constructor(x: number, y: number, size: number, gameObject: GameObject) {
    super(x, y, size, gameObject);
  }

  renderBorder():void {
    game.ctx.strokeStyle = 'green';
    game.ctx.lineWidth = 2;
    game.ctx.strokeRect(this.currentGameObject.x, this.currentGameObject.y, this.currentGameObject.size, this.currentGameObject.size);
  }

  collides(obj: GameObject): boolean {
    const collides = 
      obj.x < this.currentGameObject.x + this.size && 
      obj.x + obj.size > this.currentGameObject.x && 
      obj.y < this.currentGameObject.y + this.size && 
      obj.y + obj.size > this.currentGameObject.y;
    return collides;
  }
}