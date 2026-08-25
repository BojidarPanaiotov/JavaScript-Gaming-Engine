import {GAME} from '../constants/constants'

export abstract class GameMap {
  canvas: HTMLCanvasElement;

  constructor(
    width: number = 800, 
    height: number = 400, 
    fullscreen: boolean = true, 
    border: boolean = true,
    spacing: number = 16
  ) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    if (border) {
      canvas.style.border = `${GAME.SCREEN_BORDER_WIDTH}px solid ${GAME.SCREEN_BORDER_COLOR}`;
    }

    if (spacing) {
      canvas.style.margin = `${spacing}px`;
    }

    if (fullscreen) {
      canvas.width = innerWidth;
      canvas.height = innerHeight;

      if (border) {
        canvas.width = canvas.width - (GAME.SCREEN_BORDER_WIDTH * 2);
        canvas.height = canvas.height - (GAME.SCREEN_BORDER_WIDTH * 2);
      }

      if (spacing) {
        canvas.width = canvas.width - spacing * 2;
        canvas.height = canvas.height - spacing * 2;
      }
    }


    this.canvas = canvas;
  }

  start(): void {
    document.body.appendChild(this.canvas)
  }
}