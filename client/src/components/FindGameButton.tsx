import { Spinner, Button } from 'react-bootstrap';

export type FindGameState = 'initial' | 'searching' | 'found' | 'error';
export interface FindGameProps {
  state: FindGameState;
  disabled: boolean;
  onClick: () => void;
}

const FindGameButton: React.FC<FindGameProps> = ({
  state,
  disabled,
  onClick,
}) => {
  let label = <>Find Game</>;
  let variant = 'outline-primary';

  switch (state) {
    case 'searching':
      disabled = true;
      label = (
        <>
          <Spinner
            as='span'
            animation='grow'
            size='sm'
            role='status'
            aria-hidden='true'
            className='mr-2 mb-1'
          />
          Finding Game...
        </>
      );
      break;
    case 'found':
      disabled = true;
      variant = 'primary';
      label = <>Game Found!</>;
      break;
    case 'error':
      variant = 'outline-danger';
      label = <>An error occured 😞</>;
      break;
    case 'initial':
    default:
      break;
  }
  return (
    <Button
      variant={variant}
      size='lg'
      className='mr-4 mt-3'
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default FindGameButton;
