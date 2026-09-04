import { IGameObject } from "../../entities/abstraction/gameObject/BaseGameObject";

function aabb(obj1: IGameObject, obj2: IGameObject): boolean {
  return obj1.x < obj2.x + obj2.width &&
         obj1.x + obj1.width > obj2.x &&
         obj1.y < obj2.y + obj2.height &&
         obj1.y + obj1.height > obj2.y;
}

export const algorithms = {
  aabb
}