import { Cell, GridCoor, GameBoard as Board, SHIP } from 'common/lib/GameLogic';
import React, { useCallback, useState } from 'react';

export interface GameBoardProps {
  variant: 'player' | 'opponent';
  onClick: (pos: GridCoor) => void;
  onHover: (pos: GridCoor) => HoverStyle;
  gameBoard: Board;
}

export interface SquareProps {
  onClick: (pos: GridCoor) => void;
  onHover: (pos: GridCoor) => HoverStyle;
  pos: GridCoor;
  cell: Cell;
  isOpponent: boolean;
}

export enum HoverStyle {
  None,
  Default,
  Error,
  Action,
}

const HoverStyles: React.CSSProperties[] = [
  { backgroundColor: 'hsla(0, 0%, 0%, 0.0)' },
  { backgroundColor: 'hsla(202, 85%, 87%, 0.3)' },
  { backgroundColor: 'var(--red)' },
  { backgroundColor: 'var(--green)' },
];

const Square = ({ onClick, onHover, cell, pos, isOpponent }: SquareProps) => {
  const [hoverStyle, setHoverStyle] = useState(HoverStyles[HoverStyle.None]);
  const handleOnHover = useCallback(() => {
    let hoverStyle = HoverStyles[onHover(pos)];
    console.log(hoverStyle);
    setHoverStyle(hoverStyle);
  }, [onHover, pos]);

  const handleExitHover = useCallback(() => {
    setHoverStyle(HoverStyles[HoverStyle.None]);
  }, []);

  return (
    <div
      className='square'
      onClick={() => {
        onClick(pos);
      }}
      onMouseEnter={handleOnHover}
      onMouseLeave={handleExitHover}
      style={hoverStyle}
    >
      <div
        className={
          cell.ship !== SHIP.NONE && !isOpponent
            ? 'ship-square'
            : 'water-square'
        }
      >
        {cell.firedUpon ? (
          <div className={cell.ship !== SHIP.NONE ? 'hit' : 'miss'}></div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const GameBoard = ({
  variant,
  onClick,
  gameBoard,
  onHover,
}: GameBoardProps) => {
  console.log(gameBoard);
  return (
    <div className={`grid ${variant}`}>
      {[...Array(10)].map((_x, i) => {
        return [...Array(10)].map((_x, j) => (
          <Square
            key={i * j + j}
            onClick={onClick}
            onHover={onHover}
            cell={gameBoard.grid[i][j]}
            pos={{ x: j, y: i }}
            isOpponent={variant === 'opponent'}
          />
        ));
      })}
    </div>
  );
};

export default GameBoard;
