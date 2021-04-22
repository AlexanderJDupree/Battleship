import React, { useState, useContext } from 'react';
import { SocketContext } from '../contexts';
import { SocketEvent as Event } from 'common/lib/events';

function Example() {
  // Get global socket context
  const socket = useContext(SocketContext);

  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  const sendMsg = () => {
    setCount(count + 1);
    socket.emit(Event.DebugMessage, `Message number ${count}`);
  };

  return (
    <div>
      <button onClick={sendMsg}>Send Message to the server</button>
      <p>You've sent {count} messages</p>
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
