import { GAME } from "../../constants/constants";

export interface ISpriteSheet {
  frames: ImageBitmap[];
  totalFrames: number;
}

export class SpriteSheet implements ISpriteSheet {
  protected image: HTMLImageElement;
  frames: ImageBitmap[] = [];
  totalFrames: number;
  totalFramesPerRow: number;
  #loadPromise: Promise<boolean> | null = null;

  constructor(
    path: string, 
    preload: boolean = true, 
    totalFrames: number,
    totalFramesPerRow: number = 8
  ) {
    this.image = new Image();
    this.image.src = `${path}.png`;
    this.totalFrames = totalFrames;
    this.totalFramesPerRow = totalFramesPerRow;

    if (preload) {
      this.#load();
    }
  }

  #load(): Promise<boolean> {
    if (this.#loadPromise) {
      return this.#loadPromise;
    }

    this.#loadPromise = new Promise((resolve) => {
      this.image.onload = () => {
        this.#getFrames(this.totalFrames);
        resolve(true);
      };

      this.image.onerror = () => {
        this.#loadPromise = null;
        resolve(false);
        throw new Error(`${GAME.ERROR_LOADING_SPRITE_SHEET} ${this.image.src}`);
      };
    });

    return this.#loadPromise;
  }

  #getFrames(totalFrames: number): Promise<ImageBitmap[]> {
    return this.#load().then(async (loaded) => {
      if (!loaded) {
        return [];
      }

      if (this.frames.length > 0) {
        return this.frames;
      }

      const columns = this.totalFramesPerRow;
      const rows = Math.ceil(totalFrames / columns);
      const frameWidth = this.image.width / columns;
      const frameHeight = this.image.height / rows;

      if (frameWidth > this.image.width || frameHeight > this.image.height) {
        throw new Error(
          `Frame size ${frameWidth}x${frameHeight} is larger than spritesheet ${this.image.width}x${this.image.height}`
        );
      }

      for (let i = 0; i < totalFrames; i++) {
        const col = i % columns;
        const row = Math.floor(i / columns);
        const bitmap = await createImageBitmap(
          this.image,
          col * frameWidth,
          row * frameHeight,
          frameWidth,
          frameHeight
        );

        this.frames.push(bitmap);
      }

      return this.frames;
    });
  }
}
