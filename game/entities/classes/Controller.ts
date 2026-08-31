import { IGameObject } from "../abstraction/gameObject/GameObject";

export class Controller {
  keys = new Set<string>();
  gameObject: IGameObject;

  constructor(gameObject: IGameObject) {
    this.bindKeyDownEvent();
    this.bindKeyUpEvent();
    this.gameObject = gameObject;
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

  activate(speed: number = 1): void {
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

    this.gameObject.update(x, y);
  }
}
