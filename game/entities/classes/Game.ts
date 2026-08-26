import {GameMap} from '../abstraction/GameMap'
import { GAME } from '../../constants/constants';
export class Game extends GameMap {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(
    width: number = 800, 
    height: number = 400, 
    fullscreen: boolean = true, 
    border: boolean = true,
    spacing: number = 32
  ) {
    super();

    const canvas = document.createElement('canvas');
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error(GAME.BROKEN_CANVAS);
    }

    this.ctx = context;
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

  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  renderCoordinateSystem(multiplier: number) {
    const rowsToRender = Math.floor(this.canvas.width / multiplier);
    const colsToRender = Math.floor(this.canvas.height / multiplier);
    const totalRenders = Math.max(rowsToRender,colsToRender);

    for (let i = 1; i <= totalRenders; i++) {
      this.ctx.fillStyle = GAME.COORDINATE_SYSTEM_COLOR;
      this.ctx.fillRect(i * multiplier, 0, 1, this.canvas.height); // Column
      this.ctx.fillRect(0, i * multiplier, this.canvas.width, 1); // Row
    }
  }
}