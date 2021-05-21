import { useCallback } from 'react';
import { DIR, SHIP, SHIP_NAMES } from 'common/lib/GameLogic';

export interface ShipProps {
  orientation: DIR;
  variant: SHIP;
  isSelected: boolean;
  isPlaced: boolean;
  handleSelect: (variant: SHIP) => void;
}

const Ship = ({
  orientation,
  variant,
  isSelected,
  isPlaced,
  handleSelect,
}: ShipProps) => {
  let directionClass =
    orientation === DIR.NORTH || orientation === DIR.SOUTH
      ? 'vertical'
      : 'horizontal';
  let selected = isSelected ? 'selected' : '';
  let placed = isPlaced ? 'placed' : '';
  let shipName = variant !== SHIP.NONE ? SHIP_NAMES[variant] : '';

  const onClick = useCallback(() => {
    handleSelect(variant);
  }, [handleSelect, variant]);

  return (
    <div
      className={`ship ${shipName} ${directionClass} ${selected} ${placed}`}
      onClick={onClick}
    ></div>
  );
};

export default Ship;
