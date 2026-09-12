import { AnimatedGameObject } from "../gameObject/AnimatedGameObject";
import { SpriteSheet } from "../sprites/SpriteSheet";
import { IProjectable, IShootable } from "../interfaces/Shooting";
import { ICollectable } from "../interfaces/Collect";
import { Player } from "../player/Player";

const animationClips = {
    idle: { from: 0, to: 7, fps: 6 },
    static: { from: 2, to: 2, fps: 1 }
};

const spriteSheet = new SpriteSheet('./game/assets/pistol', true, 8);

export class Pistol extends AnimatedGameObject implements IShootable, ICollectable {
    totalAmmo: number = 49;
    ammo: number = 7;
    bullets: IProjectable[] = [];

    constructor(x: number, y: number) {
        super(x, y, animationClips, spriteSheet);
    }

    shoot(x: number, y: number): void { 
        throw new Error("Method not implemented.");
    }

    reload(ammo: number): void {
        throw new Error("Method not implemented.");
    }

    onCollect(collector: Player): void {
        collector.items.push(this);
        this.update(collector.x, collector.y, 0, "static");
        this.destroy();
    }
}
