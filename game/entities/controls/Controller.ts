export class Controller {
  keys = new Set<string>();

  constructor() {
    this.bindKeyDownEvent();
    this.bindKeyUpEvent();
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

  getNextMoveCoordinates(speed: number = 1): {x: number, y: number} {
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

    return {x, y};
  }
}
