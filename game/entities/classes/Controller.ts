import { IBaseGameObject } from "../abstraction/gameObject/BaseGameObject";

export class Controller {
  keys = new Set<string>();
  gameObjects: IBaseGameObject[];

  constructor(gameObject: IBaseGameObject);
  constructor(gameObjects: IBaseGameObject[]);
  constructor(gameObject: IBaseGameObject | IBaseGameObject[]) {
    this.bindKeyDownEvent();
    this.bindKeyUpEvent();
    this.gameObjects = Array.isArray(gameObject) ? gameObject : [gameObject];
  }

  bindKeyDownEvent(): void {
    window.addEventListener('keydown', (event) => {
      this.keys.add(event.key);
    });
  }

  bindKeyUpEvent(): void {
    window.addEventListener('keyup', (event) => {
      this.keys.delete(event.key);
    });
  }

  move(speed: number = 1): void {
    let x = 0;
    let y = 0;

    if (this.keys.has('ArrowRight')) {
      x += speed;
    }
    if (this.keys.has('ArrowLeft')) {
      x -= speed;
    }
    if (this.keys.has('ArrowUp')) {
      y -= speed;
    }
    if (this.keys.has('ArrowDown')) {
      y += speed;
    }

    this.gameObjects.forEach((gameObject) => {
      gameObject.update(x, y);
    });
  }
}
