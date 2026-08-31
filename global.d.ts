import type { Game } from './game/entities/classes/Game';
import type { SpriteSheet } from './game/entities/classes/SpriteSheet';

declare global {
  var game: Game;
  var spriteSheets: Record<string, SpriteSheet>;
}

export {};
