import {GameLogic} from "./GameLogic";

function printBoard(board: Number[][]) {
  let j = board.length;
  let i = board[0].length;
  console.log(j + ', ' + i);
}

let GL = new GameLogic();
console.log(GL);
console.log(GL.player1);
console.log(GL.player2);
