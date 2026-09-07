import { IAnimatedGameObject } from "../gameObject/AnimatedGameObject";
import { IBaseGameObject } from "../gameObject/BaseGameObject";

export class Controller {
  keys = new Set<string>();
  gameObjects: IAnimatedGameObject[];

  constructor(gameObject: IAnimatedGameObject);
  constructor(gameObjects: IAnimatedGameObject[]);
  constructor(gameObject: IAnimatedGameObject | IAnimatedGameObject[]) {
    this.bindKeyDownEvent();
    this.bindKeyUpEvent();
    this.gameObjects = Array.isArray(gameObject) ? gameObject : [gameObject];
  }

  bindKeyDownEvent(): void {
    window.addEventListener('keydown', (event) => {
      this.keys.add(event.key.toLowerCase());
    });
  }

  bindKeyUpEvent(): void {
    window.addEventListener('keyup', (event) => {
      this.keys.delete(event.key.toLowerCase());
    });
  }

  move(speed: number = 1): void {
    let x = 0;
    let y = 0;

    if (this.keys.has('d')) {
      x += speed; 
    }
    if (this.keys.has('a')) {
      x -= speed;
    }
    if (this.keys.has('w')) {
      y -= speed;
    }
    if (this.keys.has('s')) {
      y += speed;
    }

    const isMoving = x !== 0 || y !== 0;

    this.gameObjects.forEach((gameObject) => {
      gameObject.update(x, y, 0, isMoving ? "walk" : "idle");
    });
  }
}
