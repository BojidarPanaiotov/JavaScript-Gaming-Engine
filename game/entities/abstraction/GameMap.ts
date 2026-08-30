import { GameObject } from "./gameObject/AnimatedGameObject";
export abstract class GameMap {
  gameObjects: GameObject[] = [];

  constructor() {

  }

  start(): void {
  }

  clear(): void {
  }

  resize(): void {
    
  }
}