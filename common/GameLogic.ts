type Player = {
  username: string;
  board: number[][];
  // other properties
};

type Hit = {
  x: number;
  y: number;
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

  processHit(player: Player, hit: Hit) {
  }

}
