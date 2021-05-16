// game state data and game logic functions

/*****************************************************************************
* Constants
*****************************************************************************/

const BOARD_SIZE = 10;

enum PHASE {
  SETUP,
  PLAYER1_TURN,
  PLAYER2_TURN,
  GAME_OVER
};

enum PLAYER {
  PLAYER_1,
  PLAYER_2
};

// TS doesnt restrict enums to unique values, fortunate for us because
// submarine and cruiser are longth 3, hope this doesnt cause problems later...
export const DESTROYER_SIZE = 2;
export const SUBMARINE_SIZE = 3;
export const CRUISER_SIZE = 3;
export const BATTLE_SIZE = 4;
export const CARRIER_SIZE = 5;

export enum DIR {
  NORTH,
  EAST,
  SOUTH,
  WEST
};

/*****************************************************************************
* Ship
*****************************************************************************/

export class Ship {
  type: number;
  cells: Cell[];
  isSunk: boolean;
  locationOfFront: GridCoor;
  orientation: DIR;

  constructor(type: number, position: GridCoor, orientation: DIR) {

    let cells = [];

    for (let i = 0; i < type; i++) {
      let newCell = {
        hasShip: true,
        ship: type,
        isHit: false
      };
      cells.push(newCell);
    }

     this.type = type;
     this.cells = cells;
     this.isSunk = false;
     this.locationOfFront = position;
     this.orientation = orientation;
  }
};


/*****************************************************************************
* Game board
*****************************************************************************/

export interface GridCoor {
  x: number;
  y: number;
};

let myCoor: GridCoor = {x:12,y:23};

interface Cell {
  hasShip: boolean;
  ship: number;
  isHit: boolean;
};

interface GameBoard {
  grid: Cell[][];
};

function constructBoard(): number[][] {
  let board = new Array(10);

  for (let j = 0; j < 10; j++) {
    board[j] = new Array(10);
    for (let i = 0; i < 10; i++) {
      board[j][i] = 0;
    }
  }

  return board;
}

// Returns true of the ship was placed, false if the ship could not be placed.
function placeShip(board: GameBoard, ship: Ship) {
}

/*****************************************************************************
* Player state
*****************************************************************************/


// this is sent by the server to the client every time the game state changes.
// should contain all the info needed for the client to render the game.
interface PlayerState {
  phase: PHASE
  board: GameBoard;
  shots: GridCoor[];  // list of shots this player has taken
  ships: Ship[];
}

function initPlayerState(player: PlayerState) {
  player.phase = PHASE.SETUP;
}

/*****************************************************************************
* Game state
*****************************************************************************/

interface GameState {
  phase: PHASE;
  players: PlayerState[];
}

function initGameState(gamestate: GameState) {
}
