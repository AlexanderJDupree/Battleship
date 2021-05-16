// game state data and game logic functions

/*****************************************************************************
* Constants and utility types
*****************************************************************************/

export const BOARD_SIZE = 10;

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

export enum SHIP {
  DESTROYER,
  SUBMARINE,
  CRUISER,
  BATTLESHIP,
  CARRIER,
  NONE
};

// index with SHIP enum
export const SHIP_SIZES = [
  2, // destroyer
  3, // submarine
  3, // cruiser
  4, // battleship
  5, // carrier
  0  // none
];

// index with SHIP enum
export const SHIP_NAMES = [
  'destroyer',
  'submarine',
  'cruiser',
  'battleship',
  'carrier',
  'none'
];

export enum DIR {
  NORTH,
  EAST,
  SOUTH,
  WEST
};

export interface GridCoor {
  x: number;
  y: number;
};

interface Cell {
  ship: SHIP;
  isHit: boolean;
};


/*****************************************************************************
* Ship
*****************************************************************************/

export class Ship {
  type: SHIP;
  cells: Cell[];
  isSunk: boolean;
  locationOfFront: GridCoor;
  orientation: DIR;

  constructor(type: SHIP, position: GridCoor, orientation: DIR) {
    let cells = [];
    for (let i = 0; i < SHIP_SIZES[type]; i++) {
      let newCell = {
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

export class GameBoard {
  grid: Cell[][];

  constructor() {
    this.grid = new Array(BOARD_SIZE);

    for (let j = 0; j < BOARD_SIZE; j++) {
      this.grid[j] = new Array(BOARD_SIZE);
      for (let i = 0; i < BOARD_SIZE; i++) {
        let newCell = {
          ship: SHIP.NONE,
          isHit: false
        };
        this.grid[j][i] = newCell;
      }
    }
  }

  placeShip(ship: Ship): boolean {
    let start = ship.locationOfFront;
    let dir = ship.orientation;
    let length = SHIP_SIZES[ship.type];

    // check if we can place ship
    let curCoor = start;
    for (let i = 0; i < length; i++) {
      if (!this.isOnBoard(curCoor)) {
        return false;
      }
      if (this.grid[curCoor.y][curCoor.x].ship != SHIP.NONE) {
        return false;
      }
      curCoor = this.nextCellOfShip(curCoor, dir);
    }

    // if we make it here, we can place the ship...
    // place ship
    curCoor = start;
    for (let i = 0; i < length; i++) {
      this.grid[curCoor.y][curCoor.x] = ship.cells[i];
      curCoor = this.nextCellOfShip(curCoor, dir);
    }

    return true;
  }

  nextCellOfShip(curCoor: GridCoor, shipFacing: DIR): GridCoor {
    let nextCoor: GridCoor;
    switch (shipFacing) {
      case DIR.NORTH:
        nextCoor = {x: curCoor.x, y: curCoor.y + 1};
      break;
      case DIR.EAST:
        nextCoor = {x: curCoor.x - 1, y: curCoor.y};
      break;
      case DIR.SOUTH:
        nextCoor = {x: curCoor.x, y: curCoor.y - 1};
      break;
      case DIR.WEST:
        nextCoor = {x: curCoor.x + 1, y: curCoor.y};
      break;
      default:
        break;
    }

    return nextCoor;
  }

  isOnBoard(coor: GridCoor): boolean {
    return (0 <= coor.x && coor.x < BOARD_SIZE) && (0 <= coor.y && coor.y < BOARD_SIZE);
  }
};


// Returns true of the ship was placed, false if the ship could not be placed.

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
