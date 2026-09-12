import { GAME } from "../../constants/constants";

export interface ISpriteSheet {
  frames: ImageBitmap[];
  totalFrames: number;
  singleFrameWidth: number;
  singleFrameHeight: number;
  readonly ready: Promise<ISpriteSheet>;
  readonly isLoaded: boolean;
}

export class SpriteSheet implements ISpriteSheet {
  private static readonly instances: SpriteSheet[] = [];

  protected image: HTMLImageElement;
  frames: ImageBitmap[] = [];
  totalFrames: number;
  singleFrameWidth: number = 0;
  singleFrameHeight: number = 0;
  private _totalFramesPerRow: number;
  private _loadPromise?: Promise<SpriteSheet>;
  private _isLoaded = false;

  constructor(
    path: string,
    preload: boolean = true,
    totalFrames: number,
    totalFramesPerRow: number = 8
  ) {
    this.image = new Image();
    this.image.src = `${path}.png`;
    this.totalFrames = totalFrames;
    this._totalFramesPerRow = totalFramesPerRow;

    SpriteSheet.instances.push(this);

    if (preload) {
      void this.#load();
    }
  }

  get ready(): Promise<SpriteSheet> {
    return this.#load();
  }

  get isLoaded(): boolean {
    return this._isLoaded;
  }

  static whenAllReady(): Promise<void> {
    return Promise.all(SpriteSheet.instances.map((sheet) => sheet.ready)).then(() => undefined);
  }

  #load(): Promise<SpriteSheet> {
    if (this._loadPromise) {
      return this._loadPromise;
    }

    this._loadPromise = new Promise((resolve, reject) => {
      const finish = async () => {
        try {
          await this.#extractFrames();
          this._isLoaded = true;
          resolve(this);
        } catch (error) {
          this._loadPromise = undefined;
          reject(error);
        }
      };

      if (this.image.complete) {
        if (this.image.naturalWidth > 0) {
          void finish();
          return;
        }

        reject(new Error(`${GAME.ERROR_LOADING_SPRITE_SHEET} ${this.image.src}`));
        return;
      }

      this.image.onload = () => {
        void finish();
      };

      this.image.onerror = () => {
        this._loadPromise = undefined;
        reject(new Error(`${GAME.ERROR_LOADING_SPRITE_SHEET} ${this.image.src}`));
      };
    });

    return this._loadPromise;
  }

  async #extractFrames(): Promise<ImageBitmap[]> {
    if (this.frames.length > 0) {
      return this.frames;
    }

    const columns = this._totalFramesPerRow;
    const rows = Math.ceil(this.totalFrames / columns);

    this.singleFrameWidth = this.image.width / columns;
    this.singleFrameHeight = this.image.height / rows;

    if (this.singleFrameWidth <= 0 || this.singleFrameHeight <= 0) {
      throw new Error(
        `Invalid frame size ${this.singleFrameWidth}x${this.singleFrameHeight} for ${this.image.src}`
      );
    }

    for (let i = 0; i < this.totalFrames; i++) {
      const col = i % columns;
      const row = Math.floor(i / columns);
      const bitmap = await createImageBitmap(
        this.image,
        col * this.singleFrameWidth,
        row * this.singleFrameHeight,
        this.singleFrameWidth,
        this.singleFrameHeight
      );

      this.frames.push(bitmap);
    }
    
    return this.frames;
  }
}
