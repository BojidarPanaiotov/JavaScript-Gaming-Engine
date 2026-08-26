export interface ICoordinates {
  x: number;
  y: number;
}

export abstract class GameObject {
  public x: number;
  public y: number;

  constructor(coordinates: ICoordinates) {
    this.x = coordinates.x;
    this.y = coordinates.y;
  }

  abstract render(multiplier: number): void
  abstract destroy(multiplier: number): boolean
  abstract collides(gamingObject: GameObject): boolean
}