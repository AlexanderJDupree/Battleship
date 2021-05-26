/*****************************************************************************
 * Constants and utility types
 *****************************************************************************/

export const BOARD_SIZE = 10;

export enum PHASE {
  SETUP,
  PLAYER1_TURN,
  PLAYER2_TURN,
  GAME_OVER,
}

export enum PLAYER {
  PLAYER_1,
  PLAYER_2,
}

export enum SHIP {
  DESTROYER = 0,
  SUBMARINE = 1,
  CRUISER = 2,
  BATTLESHIP = 3,
  CARRIER = 4,
  NONE = 5,
}

export const SHIPS: SHIP[] = [
  SHIP.DESTROYER,
  SHIP.SUBMARINE,
  SHIP.CRUISER,
  SHIP.BATTLESHIP,
  SHIP.CARRIER,
];

// index with SHIP enum
export const SHIP_SIZES = [
  2, // destroyer
  3, // submarine
  3, // cruiser
  4, // battleship
  5, // carrier
  0, // none
];

// index with SHIP enum
export const SHIP_NAMES = [
  'destroyer',
  'submarine',
  'cruiser',
  'battleship',
  'carrier',
];

export enum DIR {
  NORTH,
  EAST,
  SOUTH,
  WEST,
}

export interface GridCoor {
  x: number;
  y: number;
}

export interface Cell {
  ship: SHIP;
  firedUpon: boolean;
}

/*****************************************************************************
 * Ship
 *****************************************************************************/

export interface Ship {
  type: SHIP;
  isSunk: boolean;
  locationOfFront: GridCoor;
  orientation: DIR;
  numHits: number;
  placed: boolean;
}

export function newShip(type: SHIP, position: GridCoor, orientation: DIR): Ship {
  let ship: Ship;
  ship = {
    type: type,
    isSunk: false,
    locationOfFront: position,
    orientation: orientation,
    numHits: 0,
    placed: false,
  };
  return ship;
}

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
          firedUpon: false,
        };
        this.grid[j][i] = newCell;
      }
    }
  }

  placeShip(ship: Ship): boolean {
    if (!this.canPlaceShip(ship)) {
      return false;
    }

    let start = ship.locationOfFront;
    let dir = ship.orientation;
    let length = SHIP_SIZES[ship.type];
    let curCoor = { x: start.x, y: start.y };

    for (let i = 0; i < length; i++) {
      this.grid[curCoor.y][curCoor.x] = { ship: ship.type, firedUpon: false };
      curCoor = this.nextCellOfShip(curCoor, dir);
    }

    ship.placed = true;

    return true;
  }

  canPlaceShip(ship: Ship): boolean {
    let start = ship.locationOfFront;
    let dir = ship.orientation;
    let length = SHIP_SIZES[ship.type];

    // check if we can place ship
    let curCoor = { x: start.x, y: start.y };
    for (let i = 0; i < length; i++) {
      if (!this.isOnBoard(curCoor)) {
        return false;
      }
      if (this.grid[curCoor.y][curCoor.x].ship != SHIP.NONE) {
        return false;
      }
      curCoor = this.nextCellOfShip(curCoor, dir);
    }

    return true;
  }

  removeShip(ship: Ship): boolean {
    if (!ship.placed) {
      return false;
    }

    let start = ship.locationOfFront;
    let dir = ship.orientation;
    let length = SHIP_SIZES[ship.type];

    let curCoor = { x: start.x, y: start.y };
    for (let i = 0; i < length; ++i) {
      if (this.isOnBoard(curCoor)) {
        this.grid[curCoor.y][curCoor.x] = { ship: SHIP.NONE, firedUpon: false };
      }
      curCoor = this.nextCellOfShip(curCoor, dir);
    }

    ship.placed = false;

    return true;
  }

  private nextCellOfShip(curCoor: GridCoor, shipFacing: DIR): GridCoor {
    let nextCoor: GridCoor;
    switch (shipFacing) {
      case DIR.NORTH:
        nextCoor = { x: curCoor.x, y: curCoor.y + 1 };
        break;
      case DIR.EAST:
        nextCoor = { x: curCoor.x - 1, y: curCoor.y };
        break;
      case DIR.SOUTH:
        nextCoor = { x: curCoor.x, y: curCoor.y - 1 };
        break;
      case DIR.WEST:
        nextCoor = { x: curCoor.x + 1, y: curCoor.y };
        break;
      default:
        break;
    }

    return nextCoor;
  }

  private isOnBoard(coor: GridCoor): boolean {
    return (
      0 <= coor.x && coor.x < BOARD_SIZE && 0 <= coor.y && coor.y < BOARD_SIZE
    );
  }
}

/*****************************************************************************
 * Player state
 *****************************************************************************/

// this is sent by the server to the client every time the game state changes.
// should contain all the info needed for the client to render the game.
export class PlayerState {
  phase: PHASE;
  board: GameBoard;
  setupBoard: GameBoard;
  setupValid: boolean;
  player: PLAYER;
  shots: GridCoor[]; // list of shots this player has taken
  ships: Ship[]; // index with SHIP enum

  constructor(player: PLAYER) {
    this.phase = PHASE.SETUP;
    this.board = new GameBoard();
    this.setupBoard = new GameBoard();
    this.setupValid = false;
    this.player = player;
    this.shots = [];

    this.ships = new Array(5);
    this.ships[SHIP.DESTROYER] = newShip(SHIP.DESTROYER, { x: 0, y: 0 }, DIR.WEST);
    this.ships[SHIP.SUBMARINE] = newShip(SHIP.SUBMARINE, { x: 0, y: 0 }, DIR.WEST);
    this.ships[SHIP.CRUISER] = newShip(SHIP.CRUISER, { x: 0, y: 0 }, DIR.WEST);
    this.ships[SHIP.BATTLESHIP] = newShip(SHIP.BATTLESHIP, { x: 0, y: 0 }, DIR.WEST);
    this.ships[SHIP.CARRIER] = newShip(SHIP.CARRIER, { x: 0, y: 0 }, DIR.WEST);
  }

  isPlayersTurn(): Boolean {
    if (this.phase === PHASE.PLAYER1_TURN) {
      return this.player === PLAYER.PLAYER_1;
    } else if (this.phase === PHASE.PLAYER2_TURN) {
      return this.player === PLAYER.PLAYER_2;
    } else {
      return false;
    }
  }

  // check for repeat shots or shots out of bounds
  // returns the ship type if it was a hit, SHIP.NONE if miss
  fireAtPlayer(coor: GridCoor): SHIP {
    let cellLabel = this.board[coor.y][coor.x].ship;
    if (cellLabel != SHIP.NONE) {
      let targetShip = this.ships[cellLabel];
      targetShip.numHits++;
      if (targetShip.numHits >= SHIP_SIZES[cellLabel]) {
        targetShip.isSunk = true;
      }
    }

    this.board[coor.y][coor.x].firedUpon = true;

    return cellLabel;
  }

  allShipsPlaced(): boolean {
    for (let i = 0; i < 5; i++) {
      if (!this.ships[i].placed) {
        return false;
      }
    }

    return true;
  }
}

/*****************************************************************************
 * Game state
 *****************************************************************************/

export class GameState {
  phase: PHASE;
  players: PlayerState[];

  constructor() {
    this.phase = PHASE.SETUP;
    this.players.push(new PlayerState(PLAYER.PLAYER_1));
    this.players.push(new PlayerState(PLAYER.PLAYER_2));
  }
}
