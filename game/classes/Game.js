export class Game {
  #canvasId = 'canvas-game-screen';

  constructor(width, height) {
    this.canvas = document.getElementById(this.#canvasId);
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d');
  }

  start() {
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}