import { AnimatedGameObject } from "../../abstraction/gameObject/AnimatedGameObject";
import { ISpriteSheet } from "../SpriteSheet";
import { Animations } from "../../abstraction/gameObject/AnimatedGameObject";
import { Bullet } from "./Bullet";

export class Pistol extends AnimatedGameObject {
  public totalAmmo: number = 0;
  public bullets: Bullet[] = [];

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
    this.#load();
    window.addEventListener("mousedown", () => this.fire());
  }

  fire(): void {
    this.currentAnimation = "fire";
  
    const bullet = this.bullets.find((b) => !b.active);
    if (!bullet) {
      console.log("No bullet available");
      return;
    }

    bullet.active = true;
    bullet.x = this.x + this.width / 2;
    bullet.y = this.y + this.height / 2 - bullet.height / 2 - 10;
    bullet.currentAnimation = "fire";
    bullet.frame = 0;
  }

  #load(): void {
    for (let i = 0; i < this.totalAmmo; i++) {
      const bullet = new Bullet(this.x, this.y, 64, 32, globalThis.animationClips.bullet, globalThis.spriteSheets.bullet, true);
      this.bullets.push(bullet);
    }
  }
}
