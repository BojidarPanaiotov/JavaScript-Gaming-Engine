import { AnimatedGameObject } from "../abstraction/gameObject/AnimatedGameObject";
import { IGameObject } from "../abstraction/gameObject/GameObject";

export class Dino extends AnimatedGameObject {
  public itemCollection: IGameObject[] = [];

  update(x: number, y: number): void {
    super.update(x, y);
    this.currentAnimation = x !== 0 || y !== 0 ? "walk" : "idle";
  }
}
