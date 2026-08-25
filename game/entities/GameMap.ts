import {GAME} from '../constants/constants'

export abstract class GameMap {
  canvas: HTMLCanvasElement;

  constructor(
    width?: number, 
    height?: number, 
    fullscreen: boolean = true, 
    border: boolean = true
  ) {
    const canvas = document.createElement('canvas');

    if (border) {
      canvas.style.border = `${GAME.SCREEN_BORDER_WIDTH}px solid ${GAME.SCREEN_BORDER_COLOR}`;
    }

    if (fullscreen) {
      canvas.width = width || innerWidth;
      canvas.height = height || innerHeight;

      if (border) {
        canvas.width = canvas.width - (GAME.SCREEN_BORDER_WIDTH * 2);
        canvas.height = canvas.height - (GAME.SCREEN_BORDER_WIDTH * 2);
      }
    }


    this.canvas = canvas;
  }

  start(): void {
    document.body.appendChild(this.canvas)
  }
}