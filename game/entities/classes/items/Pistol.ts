import { AnimatedGameObject } from "../../abstraction/gameObject/AnimatedGameObject";
import { ISpriteSheet } from "../SpriteSheet";
import { Animations } from "../../abstraction/gameObject/AnimatedGameObject";
import { Bullet } from "./Bullet";
import { Projectile } from "../../abstraction/gameObject/Projectile";

export class Pistol extends AnimatedGameObject {
  public totalAmmo: number = 0;
  public bullets: Projectile[] = [];

  constructor(
    x: number, 
    y: number, 
    width: number, 
    height: number, 
    animations: Animations,
    spriteSheet: ISpriteSheet,
    totalAmmo: number
  ) {
    super(x, y, width, height, animations, spriteSheet);
    this.totalAmmo = totalAmmo;
    this.#reload();
    window.addEventListener("mousedown", () => this.#fire());
  }

  render(ctx: CanvasRenderingContext2D): void {
    super.render(ctx);
    this.#renderBullets(ctx);
  }

  #fire(): void {
    this.currentAnimation = "fire";
  
    const bullet = this.bullets.find((b) => !b.active);
    if (!bullet) {
      console.log("No bullet available");
      return;
    }

    const bulletSpeed = 1;
    const pistol = this;

    bullet.active = true;
    bullet.vx = pistol.mirrored ? -bulletSpeed : bulletSpeed;
    bullet.x = pistol.x + pistol.width / 2 - bullet.width / 2;
    bullet.y = pistol.y + pistol.height / 2 - bullet.height / 2;
  }

  #reload(): void {
    for (let i = 0; i < this.totalAmmo; i++) {
      const bullet = new Bullet(this.x, this.y, 64, 32, globalThis.animationClips.bullet, globalThis.spriteSheets.bullet);
      this.bullets.push(bullet);
    }
  }

  #renderBullets(ctx: CanvasRenderingContext2D): void {
    this.bullets.forEach((bullet) => {
        bullet.update();
        bullet.render(ctx);
        bullet.animate();
        bullet.collider?.renderBorder();
    });
  }
}
