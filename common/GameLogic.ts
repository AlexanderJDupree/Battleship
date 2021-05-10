type Player = {
  username: string;
  board: number[][];
  // other properties
};

type Hit = {
  x: number;
  y: number;
};

export class GameLogic {

  players: Player[];

  constructor() {
  }

  addPlayer(player: Player) {
  }

  setBoard(board: number[][]) {
  }

  processHit(player: Player, hit: Hit) {
  }

}
