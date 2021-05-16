interface GridCoor {
  x: number;
  y: number;
};

enum PLAYER {
  PLAYER_1,
  PLAYER_2
};

enum PHASE {
  SETUP,
  PLAYER1_TURN,
  PLAYER2_TURN,
  GAME_OVER
};

// TS doesnt restrict enums to unique values, fortunate for us because
// submarine and cruiser are longth 3, hope this doesnt cause problems later...
enum SHIP_TYPE {
  DESTROYER = 2,
  SUBMARINE = 3,
  CRUISER = 3,
  BATTLE = 4,
  CARRIER = 5
};

enum DIR {
  NORTH,
  EAST,
  SOUTH,
  WEST
};

interface Ship {
  type: SHIP_TYPE;
  cells: Cell[];
  isSunk: boolean;
  locationOfFront: GridCoor;
  orientation: DIR;
};

interface Cell {
  hasShip: boolean;
  ship: SHIP_TYPE;
  isHit: boolean;
};

interface GameBoard {
  grid: Cell[][];
};

interface SetupBoard extends GameBoard {
  // setup specific things go here...
};

// this is sent by the server to the client every time the game state changes.
// should contain all the info needed for the client to render the game.
interface PlayerState {
  phase: PHASE
  board: GameBoard;
  shots: GridCoor[];  // list of shots this player has taken
  ships: Ship[];
}

interface GameState {
  phase: PHASE;
  player1: PlayerState;
  player2: PlayerState;
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

export class GameLogic {
  constructor() {
  }

  setBoard(board: number[][]) {
  }

  processHit(player: PLAYER, hit: GridCoor) {
  }

}
