import { IAnimatedGameObject } from "../gameObject/AnimatedGameObject";

export interface IShootable extends IAnimatedGameObject {
    totalAmmo: number;
    ammo: number;
    shoot(x: number, y: number): void;
    reload(ammo: number): void;
}

export interface IProjectable extends IAnimatedGameObject {
   vx: number;
   vy: number;
}
