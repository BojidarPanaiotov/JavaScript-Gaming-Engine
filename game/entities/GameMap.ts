export abstract class GameMap {
  canvas: HTMLCanvasElement;

  constructor(fullscreen: boolean = true) {
    const canvas = document.createElement('canvas');

    if (fullscreen) {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    }

    this.canvas = canvas;
  }

  start(): void {
    document.body.appendChild(this.canvas)
  }
}