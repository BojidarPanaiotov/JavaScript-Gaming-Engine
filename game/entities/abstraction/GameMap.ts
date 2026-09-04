import { BaseGameObject } from "./gameObject/BaseGameObject";

export abstract class GameMap {
  gameObjects: BaseGameObject[] = [];

  constructor() {

  }

  start(): void {
  }

  clear(): void {
  }

  resize(): void {
    
  }
}