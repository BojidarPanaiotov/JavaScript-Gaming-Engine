import { AnimatedGameObject, AnimationMap } from "../gameObject/AnimatedGameObject";
import { ICollectable } from "../interfaces/Collect";
import { Player } from "../player/Player";
import { SpriteSheet } from "../sprites/SpriteSheet";

const animationClips = {
  idle: { from: 0, to: 7, fps: 6 }
};

const spriteSheet = new SpriteSheet('./game/assets/coin', true, 8);

export class Coin extends AnimatedGameObject implements ICollectable {
    constructor(
        x: number, 
        y: number, 
        width: number, 
        height: number
    ) {
        super(x, y, width, height, animationClips, spriteSheet);
    }

    onCollect(collector: Player): void {
        collector.items.push(this);
        this.destroy();
    }
}