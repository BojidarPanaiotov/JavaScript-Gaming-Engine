export interface ISpriteSheet {
  frames: ImageBitmap[];
}

export class SpriteSheet implements ISpriteSheet {
  protected image: HTMLImageElement;
  frames: ImageBitmap[] = [];
  #path: string;
  #isLoaded = false;
  #loadPromise: Promise<boolean> | null = null;

  constructor(path: string, preload: boolean = true, frameWidth: number, frameHeight: number) {
    this.#path = path;
    this.image = new Image();

    if (preload) {
      this.#load();
      this.#getFrames(frameWidth, frameHeight);
    }
  }

  get isLoaded(): boolean {
    return this.#isLoaded;
  }

  #load(): Promise<boolean> {
    if (this.#loadPromise) {
      return this.#loadPromise;
    }

    this.#loadPromise = new Promise((resolve) => {
      this.image.onload = () => {
        this.#isLoaded = true;
        resolve(true);
      };

      this.image.onerror = () => {
        this.#isLoaded = false;
        this.#loadPromise = null;
        resolve(false);
      };

      this.image.src = this.#path;
    });

    return this.#loadPromise;
  }

  #getFrames(frameWidth: number, frameHeight: number): Promise<ImageBitmap[]> {
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
