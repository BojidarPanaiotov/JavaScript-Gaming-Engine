import { IBaseGameObject } from "../gameObject/BaseGameObject";

export interface ICollectable extends IBaseGameObject {
    onCollect(collector: IBaseGameObject): void;
}