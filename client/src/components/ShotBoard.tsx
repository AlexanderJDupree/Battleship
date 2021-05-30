import { GridCoor, SHIP, Shot } from 'common/lib/GameLogic';
import React, { useCallback, useState } from 'react';
import { HoverStyle, HoverStyles } from './GameBoard';

export interface ShotBoardProps {
  onClick: (pos: GridCoor) => void;
  onHover: (pos: GridCoor) => HoverStyle;
  shots: Shot[];
}

export interface SquareProps {
  onClick: (pos: GridCoor) => void;
  onHover: (pos: GridCoor) => HoverStyle;
  pos: GridCoor;
  shot?: Shot;
}

const Square = ({ onClick, onHover, pos, shot }: SquareProps) => {
  const [hoverStyle, setHoverStyle] = useState(HoverStyles[HoverStyle.None]);
  const handleOnHover = useCallback(() => {
    let hoverStyle = HoverStyles[onHover(pos)];
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
      <div className='water-square'>
        {shot ? (
          <div className={shot.shipHit !== SHIP.NONE ? 'hit' : 'miss'}></div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const ShotBoard = ({ onClick, onHover, shots }: ShotBoardProps) => {
  return (
    <div className='grid'>
      {[...Array(10)].map((_x, i) => {
        return [...Array(10)].map((_x, j) => (
          <Square
            key={i * j + j}
            onClick={onClick}
            onHover={onHover}
            pos={{ x: j, y: i }}
            shot={shots.find((s) => s.location.x === j && s.location.y === i)}
          />
        ));
      })}
    </div>
  );
};

export default ShotBoard;
