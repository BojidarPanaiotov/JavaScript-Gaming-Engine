import { Game } from "./game/entities/classes/Game";

const game = new Game()
game.start()

console.log(`Width: ${game.canvas.width}, Height: ${game.canvas.height}`)
console.log(game.renderWithCoordinateSystem(25))