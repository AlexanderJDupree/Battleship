import React, { useState, useContext, useEffect, useCallback } from 'react';
import { SocketContext } from '../contexts';
import { ServerToClient as Server, Common } from 'common/lib/events';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

// TODO: remove example component
function Example() {
  /**
   * Example component detailing use cases for different react hooks
   */

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
        Send message to server
      </Button>
      <p>You've sent {count} messages</p>
      {serverStatus}
    </div>
  );
}

export default function Home() {
  return (
    <div className='home'>
      <Jumbotron>
        <h1>Hello, World!</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus ab
          veniam commodi culpa neque consectetur dolor incidunt vel praesentium
          impedit, saepe dolore nam ex sapiente architecto, perferendis natus
          voluptatem consequatur? Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Nihil sed provident ratione quae debitis illum
          incidunt obcaecati esse modi deserunt, delectus natus maiores aliquid,
          placeat, mollitia voluptatum architecto eaque rem!
        </p>
        <Example />
      </Jumbotron>
    </div>
  );
}
