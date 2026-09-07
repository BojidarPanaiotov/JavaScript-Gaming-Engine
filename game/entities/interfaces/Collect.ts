import { IBaseGameObject } from "../abstraction/gameObject/BaseGameObject";

export interface ICollectable extends IBaseGameObject {
    collect(collector: IBaseGameObject): void;
}
