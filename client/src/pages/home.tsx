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
          placeat, mollitia voluptatum architecto eaque rem! Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Voluptates temporibus enim
          dolores laboriosam molestias libero accusantium, soluta minima dicta
          laborum aperiam quibusdam suscipit facilis eaque molestiae ipsa odio
          nostrum. Eveniet? Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Laborum praesentium, doloribus facilis aperiam fugiat ipsam
          obcaecati inventore voluptatum. Sint reprehenderit commodi quos
          assumenda delectus odit, illo unde totam necessitatibus sapiente!
          Obcaecati quisquam officia voluptate modi, commodi quasi dolor odio.
          Vitae animi reprehenderit voluptas, temporibus, aspernatur ea dolor
          beatae aut magni tempora id, nesciunt aliquid eveniet? Totam est ab
          pariatur blanditiis. Aut debitis modi deserunt natus. Repellat
          repellendus officiis assumenda suscipit dolore, eaque expedita ipsa ab
          deleniti molestiae quidem obcaecati! Iure sunt ratione exercitationem
          repudiandae tenetur facilis eligendi tempora magnam at! Fugit pariatur
          eius, fugiat ab recusandae consequuntur repellat corporis ea animi
          illo? Vel id natus unde aliquam accusamus quidem ullam, similique quos
          harum nisi quaerat assumenda neque, vero quae beatae. Cum et nesciunt
          tenetur ad molestias quaerat accusantium, natus, ullam ratione id
          impedit debitis quis delectus ipsa ut earum. Mollitia aperiam odio
          consequatur sapiente corrupti quae dolore modi labore dolorum. Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Rerum culpa quasi
          eveniet illum quam possimus, ducimus blanditiis est dolorum,
          voluptatibus velit voluptate animi distinctio, modi soluta temporibus
          veniam asperiores tempore! Quaerat consectetur quisquam corrupti
          tempore sed eligendi provident aperiam dolores reprehenderit officia,
          ipsum accusamus, eos repellat quam! Explicabo libero a iure aperiam!
          At facilis excepturi, officiis nisi necessitatibus alias commodi.
          Labore asperiores, ad placeat modi quas nostrum exercitationem
          inventore cupiditate possimus molestias saepe vitae voluptatem
          dignissimos impedit quidem repellendus perferendis quae autem ratione
          mollitia sunt facilis quia aperiam? Beatae, incidunt! Hic distinctio
          molestiae fuga, aliquam qui nihil repellat, rerum cupiditate est
          maxime architecto, velit corrupti debitis? Quos unde porro animi
          voluptatum excepturi quasi sed. Animi voluptates dolor ratione ea
          laudantium. Recusandae velit nemo nihil omnis, ut et tempora quibusdam
          pariatur voluptatum sit inventore iste, aut nobis officia nisi illo
          aperiam soluta commodi perferendis? Ad doloribus impedit neque
          reprehenderit corporis quidem. Pariatur architecto temporibus minus
          quasi, officiis voluptatibus aspernatur. Iure porro nisi eum, quia
          itaque, suscipit quod ipsam quos harum blanditiis maiores hic aut
          labore tempora iusto corrupti molestias nesciunt aliquid. Nobis veniam
          earum error deleniti labore nam ipsa esse ea omnis neque, quisquam
          optio quas nostrum animi accusantium officia libero modi ad velit
          itaque. Ipsum dolore sequi facilis tenetur nobis! Mollitia modi quam
          fugiat, deserunt magni aperiam quisquam harum hic blanditiis numquam,
          praesentium eos sunt. Delectus, iste commodi neque iusto voluptates id
          nobis eligendi nisi, quisquam dignissimos qui consectetur nam.
          Deleniti officia pariatur facilis repellat natus doloremque illum
          delectus voluptatibus? Odio voluptates officiis laudantium rerum
          fugiat repudiandae animi, est assumenda cupiditate tenetur ipsum ad
          laboriosam possimus, nulla soluta perferendis corrupti. Eaque rem
          delectus minima ea saepe repudiandae vel adipisci quasi exercitationem
          consectetur expedita modi nulla illum, labore impedit nam magnam
          architecto doloremque. Rerum fugit adipisci molestias incidunt nemo
          placeat? Quos!
        </p>
        <Example />
      </Jumbotron>
    </div>
  );
}
