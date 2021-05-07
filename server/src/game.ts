import { UserID } from './session';

export type GameState = {
  player1: UserID;
  player2?: UserID;
  todo?: 'implement me';
  expiry?: number;
};

export interface GameStore {
  get: (uid: UserID) => GameState | undefined;
  set: (uid: UserID, gameState: GameState) => boolean;
  all: () => GameState[];
  length: () => number;
  destroy: (uid: UserID) => boolean;
  clear: () => void;
  touch: (uid: UserID) => boolean;
}

export type MemoryGameStoreOptions = {
  ttl: number;
};

export class MemoryGameStore implements GameStore {
  store: Map<UserID, GameState>;
  opts: MemoryGameStoreOptions;

  constructor(opts?) {
    this.store = new Map<UserID, GameState>();
    this.opts = opts || { ttl: 86400 };
  }

  get(uid: UserID) {
    let gameState = this.store.get(uid);
    if (gameState) {
      if (Date.now() > gameState.expiry) {
        this.destroy(uid);
      } else {
        return gameState;
      }
    }
    return undefined;
  }

  set(uid: UserID, gameState: GameState) {
    let expiry = Date.now() + this.opts.ttl;
    this.store.set(uid, { ...gameState, expiry });
    return true;
  }

  all() {
    return [...this.store.values()];
  }

  destroy(uid: UserID) {
    return this.store.delete(uid);
  }

  clear() {
    this.store.clear();
  }

  touch(uid: UserID) {
    let gameState = this.get(uid);
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
