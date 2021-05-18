import { Button } from 'react-bootstrap';
import { Ship } from '../components';
import { Direction, ShipNames } from '../contexts/Game';

export interface SetupBarProps {
  handleReady: () => void;
  handleRotate: () => void;
  placementDir: Direction;
  selected: string;
  handleSelect: (variant: string) => void;
}

const SetupBar = ({
  handleReady,
  handleRotate,
  placementDir,
  selected,
  handleSelect,
}: SetupBarProps) => {
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
      <div className='ship-container m-2'>
        {ShipNames.map((variant, i) => (
          <Ship
            variant={variant}
            key={i}
            isPlaced={false}
            isSelected={selected === variant}
            orientation={placementDir}
            handleSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default SetupBar;
