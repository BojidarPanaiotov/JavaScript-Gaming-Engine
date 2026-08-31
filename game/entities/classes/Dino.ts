import { AnimatedGameObject } from "../abstraction/gameObject/AnimatedGameObject";
import { Item } from "./items/Item";

export class Dino extends AnimatedGameObject {
  public itemCollection: Item[] = [];

  update(x: number, y: number): void {
    super.update(x, y);

    if (x < 0) {
      this.mirrored = true;
    } else if (x > 0) {
      this.mirrored = false;
    }

    this.currentAnimation = x !== 0 || y !== 0 ? "walk" : "idle";
  }
}
