export class Game {
  #canvasId = 'canvas-game-screen';
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  start() {
    const canvasElement = document.createElement('canvas');
    canvasElement.id = this.#canvasId;
    canvasElement.width = this.width;
    canvasElement.height = this.height;
    canvasElement.style.border = '1px solid red';
    document.body.appendChild(canvasElement);
  }
}