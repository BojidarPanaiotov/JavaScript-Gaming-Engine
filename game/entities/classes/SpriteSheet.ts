export interface ISpriteSheet {
  frames: ImageBitmap[];
}

export class SpriteSheet implements ISpriteSheet {
  protected image: HTMLImageElement;
  frames: ImageBitmap[] = [];
  totalFrames: number;
  #loadPromise: Promise<boolean> | null = null;

  constructor(
    path: string, 
    preload: boolean = true, 
    totalFrames: number
  ) {
    this.image = new Image();
    this.image.src = path;
    this.totalFrames = totalFrames;

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
      };
    });

    return this.#loadPromise;
  }

  #getFrames(totalFrames: number): Promise<ImageBitmap[]> {
    const frameWidth = this.image.width / totalFrames;
    const frameHeight = this.image.height;

    return this.#load().then(async (loaded) => {
      if (!loaded) {
        return [];
      }

      if (this.frames.length > 0) {
        return this.frames;
      }

      if (frameWidth > this.image.width || frameHeight > this.image.height) {
        throw new Error(
          `Frame size ${frameWidth}x${frameHeight} is larger than spritesheet ${this.image.width}x${this.image.height}`
        );
      }

      const frameCount = Math.floor(this.image.width / frameWidth);

      for (let i = 0; i < frameCount; i++) {
        const bitmap = await createImageBitmap(
          this.image,
          i * frameWidth,
          0,
          frameWidth,
          frameHeight
        );
        this.frames.push(bitmap);
      }

      return this.frames;
    });
  }
}
