import { Game } from './game/classes/Game.js';
import { Square } from './game/classes/Square.js';

const game = new Game(400, 400, true, 20, true);
game.start();

const square = new Square(100, 100, 80, game.ctx);
game.render(square);