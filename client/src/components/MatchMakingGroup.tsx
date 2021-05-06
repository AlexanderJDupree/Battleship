/**
 * TODO this file could use a serious refactor.
 */
import React, { useContext, useCallback, useState, useEffect } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { SocketContext } from '../contexts';
import { Server } from 'common/lib/events';
import { hasSessionID } from '../contexts/Socket';
import { FindGameState } from '../components/FindGameButton';
import {
  ConnectToServerForm,
  FindGameButton,
  JoinGameButton,
} from '../components';

type MatchmakingButtons = 'none' | 'find' | 'join' | 'connect';

const MatchMakingGroup = () => {
  const socket = useContext(SocketContext);
  const [connected, setConnected] = useState(socket.connected);
  const [connectError, setConnectError] = useState(false);
  const [findGameState, setFindGameState] = useState<FindGameState>('initial');
  const [disabled, setDisabled] = useState<MatchmakingButtons>('none');

  const handleValidated = useCallback(
    (username: string) => {
      if (!socket.connected) {
        setDisabled('connect');
        socket.auth = { username };
        socket.connect();
      }
    },
    [socket]
  );

  const handleFindGameClick = useCallback(() => {
    setDisabled('join');
    setFindGameState('searching');
    setTimeout(() => setFindGameState('found'), 3000);
    setTimeout(() => setFindGameState('error'), 6000);
    setTimeout(() => setFindGameState('initial'), 9000);
  }, []);

  const handleJoinGameSubmit = useCallback((roomCode: string) => {
    let status = false; // TODO validate room code
    if (status) {
      setDisabled('find');
      return status;
    } else {
      return 'Invalid room code';
    }
  }, []);

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
                  disabled={connectError || disabled === 'find'}
                  state={findGameState}
                  onClick={handleFindGameClick}
                />
                <JoinGameButton
                  disabled={connectError || disabled === 'join'}
                  onSubmit={handleJoinGameSubmit}
                />
              </div>
            ) : (
              <ConnectToServerForm
                onValidated={handleValidated}
                disabled={connectError || disabled === 'connect'}
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
