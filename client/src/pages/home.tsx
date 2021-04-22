import React, { useState, useContext, useEffect, useCallback } from 'react';
import { SocketContext } from '../contexts';
import { ServerToClient as Server, Common} from 'common/lib/events';

// TODO: remove example component
function Example() {
  /**
   * Example component detailing use cases for different react hooks
   */

  // Get global socket context
  const socket = useContext(SocketContext);

  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  const [serverStatus, setStatus] = useState('Server status unknown');

  const handleConnectError = useCallback(() => {
    setStatus('Error connecting to server');
  }, []);

  const handleConnect = useCallback(() => {
    setStatus('Connected to server!');
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
      <button onClick={sendMsg}>Send Message to the server</button>
      <p>You've sent {count} messages</p>
      <p>{serverStatus}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className='home'>
      <h1 className='bg-info text-dark text-center'>Hello World!</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus ab
        veniam commodi culpa neque consectetur dolor incidunt vel praesentium
        impedit, saepe dolore nam ex sapiente architecto, perferendis natus
        voluptatem consequatur?
      </p>
      <Example />
    </div>
  );
}
