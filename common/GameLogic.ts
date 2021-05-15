interface Player {
  username: string;
  board: number[][];
  // other properties
};

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
  PLAY,
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

interface GameState {
  playerBoard: GameBoard;
  playerTurn: PLAYER;
  gamePhase: PHASE
  shotsMade: GridCoor;
  ship_list: Ship[];
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
