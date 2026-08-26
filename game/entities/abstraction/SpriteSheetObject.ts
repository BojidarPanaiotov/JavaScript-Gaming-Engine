export abstract class SpriteSheetObject {
  protected image: HTMLImageElement;
  #path: string;
  #isLoaded = false;
  #loadPromise: Promise<boolean> | null = null;

  constructor(path: string, preload: boolean = true) {
    this.#path = path;
    this.image = new Image();

    if (preload) {
      this.load();
    }
  }

  get isLoaded(): boolean {
    return this.#isLoaded;
  }

  load(): Promise<boolean> {
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

  render(): void {

  }
}
