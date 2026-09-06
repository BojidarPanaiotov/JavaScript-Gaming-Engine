import { AnimatedGameObject, AnimationMap } from "../abstraction/gameObject/AnimatedGameObject";
import { ISpriteSheet } from "./SpriteSheet";
import { IProjectable, IShootable } from "../interfaces/Shooting";

export class Pistol extends AnimatedGameObject implements IShootable {
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
}
