import { IProjectable } from "../interfaces/Shooting";
import { AnimatedGameObject } from "../abstraction/gameObject/AnimatedGameObject";

export class Bullet extends AnimatedGameObject implements IProjectable {
    public vx: number;
    public vy: number;

    constructor(vx: number, vy: number) {
        super(0, 0, 0, 0, animationClips.bullet, spriteSheets.bullet);
        this.vx = vx;
        this.vy = vy;
    }
}