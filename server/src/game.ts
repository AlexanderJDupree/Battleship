import { genID } from './utils';
import { UserID } from './session';
import {
  GameState,
  newGameState,
} from 'common/lib/GameLogic';

export type GameID = string;

export interface GameStore {
  get: (gid: GameID) => GameState | undefined;
  create: (host: UserID, isPublic: boolean) => GameID;
  set: (gid: GameID, gameState: GameState) => boolean;
  all: () => { gid: GameID; game: GameState }[];
  length: () => number;
  destroy: (gid: GameID) => boolean;
  clear: () => void;
  touch: (gid: GameID) => boolean;
}

export type MemoryGameStoreOptions = {
  ttl: number;
};

export class MemoryGameStore implements GameStore {
  store: Map<GameID, GameState>;
  opts: MemoryGameStoreOptions;

  constructor(opts?) {
    this.store = new Map<GameID, GameState>();
    this.opts = opts || { ttl: 86400 };
  }

  get(gid: GameID) {
    let gameState = this.store.get(gid);
    if (gameState) {
      if (Date.now() > gameState.expiry) {
        this.destroy(gid);
      } else {
        return gameState;
      }
    }
    return undefined;
  }

  create(host: UserID, isPublic: boolean) {
    let gid = genID();
    let newGame = newGameState();
    newGame.playerIDs[0] = host;
    newGame.isPublic = isPublic;
    this.set(gid, newGame);
    return gid;
  }

  set(gid: GameID, gameState: GameState) {
    let expiry = Date.now() + this.opts.ttl;
    this.store.set(gid, { ...gameState, expiry });
    return true;
  }

  all() {
    return Array.from(this.store, ([gid, game]) => ({ gid, game }));
  }

  destroy(gid: GameID) {
    return this.store.delete(gid);
  }

  clear() {
    this.store.clear();
  }

  touch(gid: GameID) {
    let gameState = this.get(gid);
    if (gameState) {
      gameState.expiry = Date.now() + this.opts.ttl;
      return true;
    } else {
      return false;
    }
  }

  length() {
    return this.store.size;
  }
}
