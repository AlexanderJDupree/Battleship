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

// encapsulate player into struct?
interface GameState {
  gamePhase: PHASE
  playerBoard1: GameBoard;
  playerBoard2: GameBoard;
  player1Shots: GridCoor;
  player2Shots: GridCoor;
  player1Ships: Ship[];
  player2Ships: Ship[];
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

  player1: Player;
  player2: Player;

  constructor() {
    this.player1 = {username: 'Josh', board: constructBoard()};
    this.player2 = {username: 'Pieper', board: constructBoard()};
  }

  addPlayer(player: Player) {
  }

  setBoard(board: number[][]) {
  }

  processHit(player: Player, hit: GridCoor) {
  }

}
