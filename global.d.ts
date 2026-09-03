import type { Game } from './game/entities/classes/Game';
import type { SpriteSheet } from './game/entities/classes/SpriteSheet';
import type { Animations } from './game/entities/abstraction/gameObject/AnimatedGameObject';

declare global {
  var game: Game;
  var spriteSheets: Record<string, SpriteSheet>;
  var animationClips: Record<string, Animations>;
}

export {};
