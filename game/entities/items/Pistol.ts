import { AnimatedGameObject, AnimationMap } from "../gameObject/AnimatedGameObject";
import { ISpriteSheet } from "../sprites/SpriteSheet";
import { IProjectable, IShootable } from "../interfaces/Shooting";
import { ICollectable } from "../interfaces/Collect";
import { Player } from "../player/Player";

export class Pistol extends AnimatedGameObject implements IShootable, ICollectable {
    totalAmmo: number = 49;
    ammo: number = 7;
    bullets: IProjectable[] = [];

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        animations: AnimationMap,
        spriteSheet: ISpriteSheet
    ) {
        super(x, y, width, height, animations, spriteSheet);
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
