import { SpriteSheetObject } from "../abstraction/SpriteSheetObject";

export class Dino extends SpriteSheetObject {
  constructor(path:string, preload: boolean = true) {
    super(path, preload)
  }

  render(): void {
    game.ctx.drawImage(this.image, 0, 0);
  }
}