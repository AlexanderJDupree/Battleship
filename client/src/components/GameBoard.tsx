export interface GameBoardProps {
  variant: 'player' | 'opponent';
  onClick?: () => void;
}

export interface SquareProps {
  onClick?: () => void;
}

const Square = ({ onClick }: SquareProps) => {
  return <div className='square' onClick={onClick}></div>;
};

const GameBoard = ({ variant, onClick }: GameBoardProps) => {
  return (
    <div className={`grid ${variant}`}>
      {[...Array(10)].map((_x, i) => {
        return [...Array(10)].map((_x, j) => (
          <Square key={i * j + j} onClick={onClick} />
        ));
      })}
    </div>
  );
};

export default GameBoard;
