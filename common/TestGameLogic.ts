import {Ship} from "./GameLogic";
import {SHIP} from "./GameLogic";
import {DIR} from "./GameLogic";
import {GridCoor} from "./GameLogic";
import {GameBoard} from "./GameLogic";
import {BOARD_SIZE} from "./GameLogic";


/*
  create a board
  create some ships
  print the board
  for all ships:
    add ship
    print new board

  create ships that dont fit
  for all ships:
    add ship
    print new board
*/


function printBoard(board: GameBoard) {
  for (let j = 0; j < BOARD_SIZE; j++) {
    let rowString: string = '';
    for (let i = 0; i < BOARD_SIZE; i++) {
      if (board.grid[j][i].ship == SHIP.NONE) {
        rowString += '0 ';
      } else {
        rowString += 'x ';
      }
    }
    console.log(rowString);
  }
}

let board = new GameBoard();
let ship = new Ship(SHIP.BATTLESHIP, {x:5, y:6}, DIR.SOUTH);

printBoard(board);

if (board.placeShip(ship)) {
  console.log('placed ship');
} else {
  console.log('could not place ship');
}

printBoard(board);
