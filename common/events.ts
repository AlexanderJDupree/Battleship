/**
 * Battleship game socket events
 *
 * *Note*: Socket.io types use the type `... any[]` to handle an arbitrary
 * number of args to the emit and handler functions. As such, the docs
 * for each event in the file contain an `@args` tag which describe what
 * the structure of the expected args should be.
 */
export namespace SocketEvent {
  export namespace Client {
    /**
     * Event fired when:
     *    - Low level connection cannot be established
     *    - The connection is denied by the servers middleware
     *
     * If connection couldn't be established the socket client will
     * automatically attempt to reconnect. If the middleware denied the
     * connection then the client will need to fix the issue and reconnect
     * manually.
     *
     * @args: empty
     *
     */
    export const ConnectError = 'connect-error';

    /**
     * Event fires when the client is connected or reconnected to
     * the server.
     *
     * @args: empty
     */
    export const Connect = 'connect';

    /**
     * Event fires then the client has disconnected
     *
     * @args: empty
     */
    export const Disconnect = 'disconnect';
  }

  export namespace Server {
    /**
     * Event fires when the Server receives a new socket connection
     *
     * @args:
     *  - socket: Socket
     *
     */
    export const Connection = 'connection';

    /**
     * Event fires when a socket was disconneted
     *
     * @args:
     *  - reason: string
     */
    export const Disconnect = 'disconnect';
  }

  /**
   * Event fires when the server/client sends a debug message
   *
   * @args:
   *  - msg: string
   */
  export const DebugMessage = 'debug-message';
}
