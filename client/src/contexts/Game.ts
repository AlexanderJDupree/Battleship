import React from 'react';

// TODO this file should be using types and methods from the common library

export enum GamePhase {
  Setup,
  Battle,
  Won,
}

export enum Direction {
  North,
  East,
  South,
  West,
}

export const ShipNames = [
  'patrol-boat',
  'submarine',
  'cruiser',
  'battleship',
  'carrier',
];

// TODO use common library type
export interface GameState {
  phase: GamePhase;
  turn: number;
}

export const InitialGameState: GameState = {
  phase: GamePhase.Setup,
  turn: 0,
};

export const GameContext = React.createContext<GameState>({
  ...InitialGameState,
});
