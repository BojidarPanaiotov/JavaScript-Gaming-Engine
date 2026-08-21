export class Game {
  #canvasId = 'canvas-game-screen';
  #borderWidth = 1;
  width;
  height;
  fullScreen;
  spacing;
  showBorder;
  ctx;

  constructor(width, height, fullScreen = false, spacing = 0, showBorder = false) {
    this.width = width;
    this.height = height;
    this.fullScreen = fullScreen;
    this.spacing = spacing;
    this.showBorder = showBorder;
    this.ctx = null;
  }

  start() {
    const canvasElement = document.createElement('canvas');
    canvasElement.id = this.#canvasId;

    if (this.showBorder) {
      canvasElement.style.border = `${this.#borderWidth}px solid red`;
    }
  
    if (this.fullScreen) {
      let minusWidth = this.spacing * 2;
      let minusHeight = this.spacing * 2;

      if (this.showBorder) {
        minusWidth += this.#borderWidth * 2;
        minusHeight += this.#borderWidth * 2;
      }

      canvasElement.style.margin = `${this.spacing}px`;
      canvasElement.width = window.innerWidth - minusWidth;
      canvasElement.height = window.innerHeight - minusHeight;
    } else {
      canvasElement.width = this.width;
      canvasElement.height = this.height;
    }
    document.body.appendChild(canvasElement);
    this.ctx = canvasElement.getContext('2d');
  }

  render(gameObject) {
    this.clearCanvas();
  
    gameObject.update();
    gameObject.render();

    requestAnimationFrame(() => this.render(gameObject));
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, innerWidth, innerHeight);
  }
}