import type { Game } from './game/entities/classes/Game';
import type { AnimationClips, SpriteSheets } from './game/utils/algorithms/init';

declare global {
  var game: Game;
  var spriteSheets: SpriteSheets;
  var animationClips: AnimationClips;
}

export {};
