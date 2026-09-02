import { AnimatedGameObject } from "../../abstraction/gameObject/AnimatedGameObject";
import { ISpriteSheet } from "../SpriteSheet";
import { Animations } from "../../abstraction/gameObject/AnimatedGameObject";

export class Pistol extends AnimatedGameObject {
  public totalAmmo: number = 0;
  
  constructor(
    x: number, 
    y: number, 
    width: number, 
    height: number, 
    animations: Animations,
    spriteSheet: ISpriteSheet,
    totalAmmo: number,
    collider?: boolean
  ) {
    super(x, y, width, height, animations, spriteSheet, collider);
    this.totalAmmo = totalAmmo;
    window.addEventListener("mousedown", () => this.fire());
  }

  fire(): void {
    this.currentAnimation = "fire";
    this.frame = this.animations.fire.from;
  }
}
