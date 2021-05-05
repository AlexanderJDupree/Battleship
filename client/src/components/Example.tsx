/**
 *  Example component demonstrating different uses of React hooks/contexts
 */
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { SocketContext } from '../contexts';
import { Server, Common } from 'common/lib/events';
import Button from 'react-bootstrap/Button';

export default function Example() {
  // Get global socket context
  const socket = useContext(SocketContext);

  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  const [serverStatus, setStatus] = useState(
    <p className='text-warning'>Server Status Unknown</p>
  );

  const handleConnectError = useCallback(() => {
    setStatus(<p className='text-danger'>Error connecting to server</p>);
  }, []);

  const handleConnect = useCallback(() => {
    setStatus(<p className='text-success'>Connected to Server!</p>);
  }, []);

  // Update server status when socket state changes
  useEffect(() => {
    socket.on(Server.Connect, handleConnect);

    socket.on(Server.ConnectError, handleConnectError);

    return () => {
      // Teardown event listeners
      socket.off(Server.Connect, handleConnect);
      socket.off(Server.ConnectError, handleConnectError);
    };
  }, [socket, handleConnectError, handleConnect]);

  const sendMsg = () => {
    if (socket.connected) {
      setCount(count + 1);
      socket.emit(Common.DebugMessage, `Message number ${count}`);
    }
  };

  return (
    <div>
      <Button variant='primary' onClick={sendMsg}>
        Example button
      </Button>
      <p>You've sent {count} messages</p>
      {serverStatus}
    </div>
  );
}
