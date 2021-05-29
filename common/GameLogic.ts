/*****************************************************************************
 * Constants and utility types
 *****************************************************************************/
type UserID = string;

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

export interface GameBoard {
  grid: Cell[][];
}

export function newGameBoard(): GameBoard {
  let newBoard: GameBoard;
  newBoard = {
    grid: new Array(BOARD_SIZE),
  };
  for (let j = 0; j < BOARD_SIZE; j++) {
    newBoard.grid[j] = new Array(BOARD_SIZE);
    for (let i = 0; i < BOARD_SIZE; i++) {
      let newCell = {
        ship: SHIP.NONE,
        firedUpon: false,
      };
      newBoard.grid[j][i] = newCell;
    }
  }
  return newBoard;
}

export function placeShip(board: GameBoard, ship: Ship): boolean {
  if (!canPlaceShip(board, ship)) {
    return false;
  }

  let start = ship.locationOfFront;
  let dir = ship.orientation;
  let length = SHIP_SIZES[ship.type];
  let curCoor = { x: start.x, y: start.y };

  for (let i = 0; i < length; i++) {
    board.grid[curCoor.y][curCoor.x] = { ship: ship.type, firedUpon: false };
    curCoor = nextCellOfShip(curCoor, dir);
  }

  ship.placed = true;

  return true;
}

export function canPlaceShip(board: GameBoard, ship: Ship): boolean {
  let start = ship.locationOfFront;
  let dir = ship.orientation;
  let length = SHIP_SIZES[ship.type];

  // check if we can place ship
  let curCoor = { x: start.x, y: start.y };
  for (let i = 0; i < length; i++) {
    if (!isOnBoard(curCoor)) {
      return false;
    }
    if (board.grid[curCoor.y][curCoor.x].ship != SHIP.NONE) {
      return false;
    }
    curCoor = nextCellOfShip(curCoor, dir);
  }

  return true;
}

export function removeShip(board: GameBoard, ship: Ship): boolean {
  if (!ship.placed) {
    return false;
  }

  let start = ship.locationOfFront;
  let dir = ship.orientation;
  let length = SHIP_SIZES[ship.type];

  let curCoor = { x: start.x, y: start.y };
  for (let i = 0; i < length; ++i) {
    if (isOnBoard(curCoor)) {
      board.grid[curCoor.y][curCoor.x] = { ship: SHIP.NONE, firedUpon: false };
    }
    curCoor = nextCellOfShip(curCoor, dir);
  }

  ship.placed = false;

  return true;
}

export function nextCellOfShip(curCoor: GridCoor, shipFacing: DIR): GridCoor {
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

export function isOnBoard(coor: GridCoor): boolean {
  return (
    0 <= coor.x && coor.x < BOARD_SIZE && 0 <= coor.y && coor.y < BOARD_SIZE
  );
}

/*****************************************************************************
 * Player state
 *****************************************************************************/

export interface Shot {
  location: GridCoor,
  isHit: boolean,
  shipHit: SHIP,
}

// this is sent by the server to the client every time the game state changes.
// should contain all the info needed for the client to render the game.
export interface PlayerState {
  phase: PHASE;
  board: GameBoard;
  setupBoard: GameBoard;
  setupValid: boolean;
  isReady: boolean;
  player: PLAYER;
  shots: Shot[]; // list of shots this player has taken
  ships: Ship[]; // index with SHIP enum
}

export function newPlayerState(player: PLAYER): PlayerState {
  let newPlayer;
  newPlayer = {
    phase: PHASE.SETUP,
    board: newGameBoard(),
    setupBoard: newGameBoard(),
    setupValid: false,
    isReady: false,
    player: player,
    shots: [],
    ships: new Array(5),
    didLastShotHit: false,
    lastShipHit: SHIP.NONE,
  };

  newPlayer.ships[SHIP.DESTROYER] = newShip(SHIP.DESTROYER, { x: 0, y: 0 }, DIR.WEST);
  newPlayer.ships[SHIP.SUBMARINE] = newShip(SHIP.SUBMARINE, { x: 0, y: 0 }, DIR.WEST);
  newPlayer.ships[SHIP.CRUISER] = newShip(SHIP.CRUISER, { x: 0, y: 0 }, DIR.WEST);
  newPlayer.ships[SHIP.BATTLESHIP] = newShip(SHIP.BATTLESHIP, { x: 0, y: 0 }, DIR.WEST);
  newPlayer.ships[SHIP.CARRIER] = newShip(SHIP.CARRIER, { x: 0, y: 0 }, DIR.WEST);
  return newPlayer;
}

export function isPlayersTurn(player: PlayerState): Boolean {
  if (player.phase === PHASE.PLAYER1_TURN) {
    return player.player === PLAYER.PLAYER_1;
  } else if (player.phase === PHASE.PLAYER2_TURN) {
    return player.player === PLAYER.PLAYER_2;
  } else {
    return false;
  }
}

// check for repeat shots or shots out of bounds
// returns the ship type if it was a hit, SHIP.NONE if miss
export function fireAtPlayer(player: PlayerState, coor: GridCoor): SHIP {
  let cellLabel = player.board[coor.y][coor.x].ship;
  if (cellLabel != SHIP.NONE) {
    let targetShip = player.ships[cellLabel];
    targetShip.numHits++;
    if (targetShip.numHits >= SHIP_SIZES[cellLabel]) {
      targetShip.isSunk = true;
    }
  }

    player.board[coor.y][coor.x].firedUpon = true;

    return cellLabel;
}

export function allShipsPlaced(player: PlayerState): boolean {
  for (let i = 0; i < 5; i++) {
    if (!player.ships[i].placed) {
      return false;
    }
  }

  return true;
}

export function allShipsSunk(player: PlayerState): boolean {
  for (let i = 0; i < 5; i++) {
    if (!player.ships[i].isSunk) {
      return false;
    }
  }

  return true;
}

/*****************************************************************************
 * Game state
 *****************************************************************************/

export interface GameState {
  phase: PHASE;
  playerStates: PlayerState[];
  playerIDs: UserID[];
  isPublic: boolean;
  winner: PLAYER;
  expiry?: number;
}

export function newGameState(): GameState {
  let newGame: GameState;
  newGame = {
    phase: PHASE.SETUP,
    playerStates: new Array(2),
    playerIDs: new Array(2),
    isPublic: true,
    winner: undefined,
  };

  newGame.playerStates[0] = newPlayerState(PLAYER.PLAYER_1);
  newGame.playerStates[1] = newPlayerState(PLAYER.PLAYER_2);
  newGame.playerIDs[0] = null;
  newGame.playerIDs[1] = null;

  return newGame;
}

export function getPlayerState(game: GameState, id: string): PlayerState {
  let index;
  for (let i = 0; i < 2; i++) {
    if (game.playerIDs[i] === id) {
      index = i;
      break;
    }
  }
  if (index) {
    return game.playerStates[index];
  } else {
    return null;
  }
}

export function getOpponentState(game: GameState, playerID: string): PlayerState {
  let index;
  if (game.playerIDs.includes(playerID)) {
    for (let i = 0; i < 2; i++) {
      if (game.playerIDs[i] !== playerID) {
        index = i;
        break;
      }
    }
    if (index) {
      return game.playerStates[index];
    } else {
      return null;
    }
  }
}

export function getOpponentID(game: GameState, playerID: string): UserID | null {
  let index;
  if (game.playerIDs.includes(playerID)) {
    for (let i = 0; i < 2; i++) {
      if (game.playerIDs[i] !== playerID) {
        return game.playerIDs[i];
      }
    }
  }

  return null;
}

export function checkForWinner(game: GameState): UserID | null {
  let p1 = game.playerStates[PLAYER.PLAYER_1];
  let p2 = game.playerStates[PLAYER.PLAYER_2];

  if (allShipsSunk(p1)) {
    game.winner = PLAYER.PLAYER_2;
    game.phase = PHASE.GAME_OVER;
    return game.playerIDs[PLAYER.PLAYER_2];
  }

  if (allShipsSunk(p2)) {
    game.winner = PLAYER.PLAYER_1;
    game.phase = PHASE.GAME_OVER;
    return game.playerIDs[PLAYER.PLAYER_1];
  }

  return null;
}
