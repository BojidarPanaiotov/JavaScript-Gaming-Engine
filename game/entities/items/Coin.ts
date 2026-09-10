import { AnimatedGameObject } from "../gameObject/AnimatedGameObject";
import { ICollectable } from "../interfaces/Collect";
import { Player } from "../player/Player";

export class Coin extends AnimatedGameObject implements ICollectable {
    onCollect(collector: Player): void {
        collector.items.push(this);
        this.destroy();
    }
}