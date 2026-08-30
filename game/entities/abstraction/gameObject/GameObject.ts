export interface IGameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  update(x: number, y: number): void;
  render(): void;
  destroy(): boolean;
}

export abstract class GameObject implements IGameObject {
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  constructor(
    x: number, 
    y: number, 
    width: number, 
    height: number
) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    game.gameObjects.push(this);
  }

  abstract render(): void
  abstract update(x: number, y: number): void

  destroy(): boolean {
    const index = game.gameObjects.indexOf(this);

    if (index === -1) {
      return false;
    }
  
    game.gameObjects.splice(index, 1);
    return true;
  }
}
