import { IProjectable } from "../interfaces/Shooting";
import { AnimatedGameObject } from "../gameObject/AnimatedGameObject";
import { ICollectable } from "../interfaces/Collect";
import { Dino } from "../player/Player";

export class Bullet extends AnimatedGameObject implements IProjectable, ICollectable {
    public vx: number;
    public vy: number;

    constructor(vx: number, vy: number) {
        super(0, 0, 0, 0, animationClips.pistol, spriteSheets.pistol);
        this.vx = vx;
        this.vy = vy;
    }

    onCollect(collector: Dino): void {
        collector.items.push(this);
    }
}