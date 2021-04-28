# Battleship

[playbattleship.com](https://playbattleship.com) is a full-stack web application for playing the classic strategy game, [Battleship](<https://en.wikipedia.org/wiki/Battleship_(game)>), in the browser. This application was developed as part of the Full-Stack Web Development course at Portland State University.

## Built With

- [React](https://reactjs.org/) - Front end framework
- [Express](https://expressjs.com/) - Backend Server
- [Typescript](https://www.typescriptlang.org/) - Typed Javascript
- [Socket.io](https://socket.io/) - Web socket library
- [Firebase](https://firebase.google.com/) - Hosting and platform service

## Getting Started

Before we can setup the project locally we need to install some dependencies.

- [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [yarn](https://yarnpkg.com/getting-started/install) _Note_: This is required since this project uses yarn [workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) to manage linked dependencies

With the prerequisites dealt with, we can clone the repo and install the project:

```bash
git clone https://github.com/AlexanderJDupree/Battleship
cd Battleship
yarn install
```

## Usage

See the `package.json` file for a full list of commands but the primary commands we will use are:

- Run the client development server with live reloading at `localhost:3000`
  ```bash
  yarn run client
  ```
- Run the Battleship websockets server with live reloading at `localhost:8080`.
  ```bash
  yarn run server
  ```
- Run both client and server concurrently
  ```
  yarn start
  ```

## What's in this Repo?

```
.
├───.github             <-- CI stuff
│   └───workflows
|
├───client              <-- React application frontend
│   ├───public              <-- Static assets
│   └───src
│       ├───components      <-- Reusable React components
│       ├───contexts        <-- Shareable data between components
│       ├───pages           <-- Main routes for the site
│       ├───styles          <-- Site and individual css themes
│       └───utils           <-- Utility functions
|
├───common              <-- Server/Client shared code e.g. Game logic, event types
│   └───lib
├───docs                <-- Documentatoin
|
└───server              <-- Battleship express server
    └───src
```

## Authors

TODO

## License

TODO

## Misc

Recommended VScode extensions for development:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion)
