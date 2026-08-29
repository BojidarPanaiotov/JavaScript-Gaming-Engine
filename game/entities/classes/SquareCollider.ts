import { GameObject } from "../abstraction/GameObject";
import { AbstractCollider } from "../abstraction/AbstractCollider";
import * as utils from '../../utils/algorithms/aabb';

export class SquareCollider extends AbstractCollider {
  renderBorder():void {
    game.ctx.strokeStyle = 'green';
    game.ctx.lineWidth = 1;
    game.ctx.strokeRect(
      this.currentGameObject.x, 
      this.currentGameObject.y, 
      this.currentGameObject.size, 
      this.currentGameObject.size
    );
  }

  collideSingle(obj: GameObject): boolean {
    return utils.algorithms.aabb(this.currentGameObject, obj);
  }
}