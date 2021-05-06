/**
 * TODO this file could use a serious refactor.
 */
import React, { useContext, useCallback, useState, useEffect } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { SocketContext } from '../contexts';
import { Server } from 'common/lib/events';
import { hasSessionID } from '../contexts/Socket';
import { useHistory } from 'react-router-dom';
import { FindGameState } from '../components/FindGameButton';
import {
  ConnectToServerForm,
  FindGameButton,
  JoinGameButton,
} from '../components';
import { Button } from 'react-bootstrap';

interface HostGameProps {
  disabled: boolean;
  onClick: () => void;
}
const HostGameButton: React.FC<HostGameProps> = ({ disabled, onClick }) => {
  return (
    <Button
      variant='outline-success'
      size='lg'
      className='mr-4 mt-3'
      disabled={disabled}
      onClick={onClick}
    >
      Host Game
    </Button>
  );
};

const MatchMakingGroup = () => {
  const socket = useContext(SocketContext);
  const [connected, setConnected] = useState(socket.connected);
  const [connectError, setConnectError] = useState(false);
  const [findGameState, setFindGameState] = useState<FindGameState>('initial');
  const [disableButtons, setDisableButtons] = useState(false);

  let history = useHistory();

  const handleValidated = useCallback(
    (username: string) => {
      if (!socket.connected) {
        setDisableButtons(true);
        socket.auth = { username };
        socket.connect();
      }
    },
    [socket]
  );

  const handleFindGameClick = useCallback(() => {
    setDisableButtons(true);
    setFindGameState('searching');
    setTimeout(() => setFindGameState('found'), 3000);
    setTimeout(() => setFindGameState('error'), 6000);
    setTimeout(() => setFindGameState('initial'), 9000);
  }, []);

  const handleJoinGameSubmit = useCallback((roomCode: string) => {
    let status = true; // TODO validate room code
    if (status) {
      setDisableButtons(true);
      return status;
    } else {
      return 'Invalid room code';
    }
  }, []);

  const handleHostGameClick = useCallback(() => {
    history.push('/game?host=true');
  }, [history]);

  const handleConnect = useCallback(() => {
    setConnected(true);
    setConnectError(false);
  }, []);

  const handleConnectError = useCallback(() => {
    setConnected(false);
    setConnectError(true);
  }, []);

  useEffect(() => {
    socket.on(Server.Connect, handleConnect);
    socket.on(Server.ConnectError, handleConnectError);
    socket.on(Server.Disconnect, handleConnectError);
    return () => {
      socket.off(Server.Connect, handleConnect);
    };
  });

  const nodeRef = React.createRef<HTMLDivElement>();

  return (
    <>
      <SwitchTransition>
        <CSSTransition
          key={connected || hasSessionID() ? 'connected' : 'not-connected'}
          timeout={500}
          classNames='fade'
          nodeRef={nodeRef}
        >
          <div ref={nodeRef}>
            {connected || hasSessionID() ? (
              <div>
                <FindGameButton
                  disabled={connectError || disableButtons}
                  state={findGameState}
                  onClick={handleFindGameClick}
                />
                <HostGameButton
                  disabled={connectError || disableButtons}
                  onClick={handleHostGameClick}
                />
                <JoinGameButton
                  disabled={connectError || disableButtons}
                  onSubmit={handleJoinGameSubmit}
                />
              </div>
            ) : (
              <ConnectToServerForm
                onValidated={handleValidated}
                disabled={connectError || disableButtons}
              />
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
      {connectError ? (
        <p className='text-danger mt-2'>
          Unable to connect right now. Please try again later
        </p>
      ) : (
        <></>
      )}
    </>
  );
};

export default MatchMakingGroup;
