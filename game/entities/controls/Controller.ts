export class Controller {
  keys = new Set<string>();

  constructor() {
    this.bindKeyDownEvent();
    this.bindKeyUpEvent();
  }

  bindKeyDownEvent(): void {
    window.addEventListener("keydown", (event) => {
      this.keys.add(event.code.toLowerCase());
    });
  }

  bindKeyUpEvent(): void {
    window.addEventListener("keyup", (event) => {
      this.keys.delete(event.code.toLowerCase());
    });
  }

  getNextMoveCoordinates(speed: number = 1): { x: number; y: number } {
    let x = 0;
    let y = 0;

    if (this.keys.has("keyd")) {
      x += speed;
    }
    if (this.keys.has("keya")) {
      x -= speed;
    }
    if (this.keys.has("keyw")) {
      y -= speed;
    }
    if (this.keys.has("keys")) {
      y += speed;
    }

    return { x, y };
  }
}
