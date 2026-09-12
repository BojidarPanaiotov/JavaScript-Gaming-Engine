import { AnimatedGameObject } from "../gameObject/AnimatedGameObject";
import { SpriteSheet } from "../sprites/SpriteSheet";

const animationClips = {
  idle: { from: 0, to: 15, fps: 10 }
};

const spriteSheets = {
  normal: new SpriteSheet('./game/assets/normal-tree', true, 17, 17),
  autumn: new SpriteSheet('./game/assets/autumn-tree', true, 16, 16),
};

export type TreeType = keyof typeof spriteSheets;

export class Tree extends AnimatedGameObject {
  constructor(
    x: number, 
    y: number, 
    treeType: TreeType
  ) {
    super(x, y, animationClips, spriteSheets[treeType], 2);
  }
}