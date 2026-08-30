import {GameMap} from '../abstraction/GameMap'
import { GAME } from '../../constants/constants';
import { IGameObject } from '../abstraction/gameObject/AnimatedGameObject';
export class Game extends GameMap {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  border: boolean;
  spacing: number;
  gameObjects: IGameObject[] = [];

  constructor(
    width: number = 800, 
    height: number = 400, 
    fullscreen: boolean = true, 
    border: boolean = true,
    spacing: number = 8
  ) {
    super();
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error(GAME.BROKEN_CANVAS);
    }

    this.ctx = context;
    this.canvas = canvas;
    this.spacing = spacing;
    this.border = border;

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

      this.resize()
    }
  }

  start(): void {
    document.body.appendChild(this.canvas)

    window.addEventListener('resize', () => {
      this.resize()
    });
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  resize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    if (this.border) {
      this.canvas.width = this.canvas.width - (GAME.SCREEN_BORDER_WIDTH * 2);
      this.canvas.height = this.canvas.height - (GAME.SCREEN_BORDER_WIDTH * 2);
    }

    if (this.spacing) {
      this.canvas.width = this.canvas.width - this.spacing * 2;
      this.canvas.height = this.canvas.height - this.spacing * 2;
    }
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