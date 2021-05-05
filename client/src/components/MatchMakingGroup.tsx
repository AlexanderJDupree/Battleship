/**
 * TODO this file could use a serious refactor.
 */
import React, { useContext, useCallback, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { SelectUsername } from '../components';
import { SocketContext } from '../contexts';
import { Server } from 'common/lib/events';

const MatchMakingGroup = () => {
  const socket = useContext(SocketContext);
  const [connected, setConnected] = useState(socket.connected);
  const [connectError, setConnectError] = useState(false);

  const handleConnectError = useCallback(() => {
    setConnectError(true);
  }, []);

  const handleConnect = useCallback(() => {
    setConnectError(false);
  }, []);

  const nodeRef = React.createRef<HTMLDivElement>();

  const handleValidated = (username: string) => {
    if (!socket.connected) {
      socket.auth = { username };
      socket.connect();
      setConnected(true);
    }
  };

  useEffect(() => {
    socket.on(Server.ConnectError, handleConnectError);
    socket.on(Server.Disconnect, handleConnectError);
    socket.on(Server.Connect, handleConnect);
    return () => {
      socket.off(Server.ConnectError, handleConnectError);
      socket.off(Server.Disconnect, handleConnectError);
      socket.off(Server.ConnectError, handleConnect);
    };
  }, [socket, handleConnectError, handleConnect]);

  return (
    <div>
      <SwitchTransition>
        <CSSTransition
          key={connected ? 'connected' : 'not-connected'}
          timeout={500}
          classNames='fade'
          nodeRef={nodeRef}
        >
          <div ref={nodeRef}>
            {connected ? (
              <div>
                <Button
                  variant='outline-primary'
                  size='lg'
                  className='mr-4 mt-3'
                  disabled={connectError}
                >
                  Find Game
                </Button>
                <Button
                  variant='outline-success'
                  size='lg'
                  className='mr-4 mt-3'
                  disabled={connectError}
                >
                  Join Game
                </Button>
              </div>
            ) : (
              <SelectUsername
                onValidated={handleValidated}
                label='Connect'
                disabled={connectError}
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
    </div>
  );
};

export default MatchMakingGroup;
