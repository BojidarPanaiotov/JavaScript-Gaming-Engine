import { IBaseGameObject } from "../gameObject/BaseGameObject";
import { BaseCollider } from "./BaseCollider";
import { algorithms } from "../../utils/algorithms/aabb";

export class RectangleCollider extends BaseCollider {
    collides(obj: IBaseGameObject): boolean {
        return algorithms.aabb(this.gameObject, obj);
    }
    
    collidesAny(objs: IBaseGameObject[]): IBaseGameObject[] {
        let result: IBaseGameObject[] = [];
    
        objs.some(obj => {
          if (this.gameObject === obj) {
            return;
          }
          const collides = algorithms.aabb(this.gameObject, obj);
          if (collides) {
            result.push(obj);
          }
        })
    
        return result;
    }
    
    renderBorder(): void {
        game.ctx.strokeStyle = 'blue';
        game.ctx.lineWidth = 1;
        game.ctx.strokeRect(this.gameObject.x, this.gameObject.y, this.gameObject.width, this.gameObject.height);
    }
}