import { AnimatedGameObject } from "../gameObject/AnimatedGameObject";
import { ICollectable } from "../interfaces/Collect";
import { Dino } from "../player/Dino";

export class Coin extends AnimatedGameObject implements ICollectable {
    onCollect(collector: Dino): void {
        collector.items.push(this);
        this.destroy();
    }
}