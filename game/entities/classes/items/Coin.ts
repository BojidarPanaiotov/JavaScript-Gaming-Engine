import { AnimatedGameObject } from "../../abstraction/gameObject/AnimatedGameObject";
import { ICollectable } from "../../interfaces/Collect";
import { Dino } from "../Dino";

export class Coin extends AnimatedGameObject implements ICollectable {
    onCollect(collector: Dino): void {
        collector.items.push(this);
        this.destroy();
    }
}