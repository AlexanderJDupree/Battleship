import { useCallback } from 'react';
import { Direction } from '../contexts/Game';

export interface ShipProps {
  orientation: Direction;
  variant: string;
  isSelected: boolean;
  isPlaced: boolean;
  handleSelect: (variant: string) => void;
}

const Ship = ({
  orientation,
  variant,
  isSelected,
  isPlaced,
  handleSelect,
}: ShipProps) => {
  let directionClass =
    orientation === Direction.North || orientation === Direction.South
      ? 'vertical'
      : 'horizontal';
  let selected = isSelected ? 'selected' : '';
  let placed = isPlaced ? 'placed' : '';

  const onClick = useCallback(() => {
    handleSelect(variant);
  }, [handleSelect, variant]);

  return (
    <div
      className={`ship ${variant} ${directionClass} ${selected} ${placed}`}
      onClick={onClick}
    ></div>
  );
};

export default Ship;
