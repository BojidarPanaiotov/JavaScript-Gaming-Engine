import { IBaseGameObject } from "../abstraction/gameObject/BaseGameObject";

export interface ICollectable extends IBaseGameObject {
    onCollect(collector: IBaseGameObject): void;
}