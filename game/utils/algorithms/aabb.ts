import { GameObject } from "../../entities/abstraction/AbstractGameObject";

function aabb(obj1: GameObject, obj2: GameObject): boolean {
  return obj1.x < obj2.x + obj2.size &&
         obj1.x + obj1.size > obj2.x &&
         obj1.y < obj2.y + obj2.size &&
         obj1.y + obj1.size > obj2.y;
}

export const algorithms = {
  aabb
}