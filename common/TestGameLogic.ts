import {Ship} from "./GameLogic";
import {SHIP} from "./GameLogic";
import {DIR} from "./GameLogic";
import {GridCoor} from "./GameLogic";
import {GameBoard} from "./GameLogic";
import {BOARD_SIZE} from "./GameLogic";
import {newShip} from "./GameLogic";
import {placeShip} from "./GameLogic";
import {newGameBoard} from "./GameLogic";


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
        rowString += '. ';
      }
    }
    console.log(rowString);
  }
}

function placeShipAndLog(board: GameBoard, ship: Ship) {
  if (placeShip(board, ship)) {
    console.log('placed ship');
  } else {
    console.log('could not place ship');
  }
}

let board = newGameBoard();
let ship = newShip(SHIP.BATTLESHIP, {x:9, y:9}, DIR.EAST);
console.log(ship);
printBoard(board);
placeShipAndLog(board, ship);
console.log(ship);

printBoard(board);

let obj1 = {x: 1, y: 2};
let obj2 = obj1;
obj2.x++;

console.log(obj2);
console.log(obj1);
// therefore, javascript objects are references...
