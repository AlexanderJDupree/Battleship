import { Button } from 'react-bootstrap';
import { Ship } from '../components';
import { DIR, SHIP, Ship as ShipClass } from 'common/lib/GameLogic';
import { useState } from 'react';

export interface SetupBarProps {
  onReady: () => boolean;
  handleRotate: () => void;
  placementDir: DIR;
  selected: SHIP;
  handleSelect: (variant: SHIP) => void;
  ships: ShipClass[];
}

const SetupBar = ({
  onReady,
  handleRotate,
  placementDir,
  selected,
  handleSelect,
  ships,
}: SetupBarProps) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleReady = () => {
    if (!onReady()) {
      setErrorMsg('You must place all your ships');
    }
  };

  return (
    <div className='setup-bar m-2'>
      <div className='setup-btn-bar m-2'>
        <Button
          variant='success'
          className='setup-btn font-bangers mx-2'
          size='lg'
          onClick={handleReady}
        >
          Ready Up!
        </Button>
        <Button
          variant='info'
          className='setup-btn font-bangers mx-2'
          size='lg'
          onClick={handleRotate}
        >
          Rotate Ships
        </Button>
      </div>
      {errorMsg && (
        <div>
          <p className='text-center text-danger'>{errorMsg}</p>
        </div>
      )}
      <div className='ship-container m-2'>
        {ships.map((ship, i) => (
          <Ship
            variant={ship.type}
            key={i}
            isPlaced={ship.placed}
            isSelected={selected === ship.type}
            orientation={placementDir}
            handleSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default SetupBar;
