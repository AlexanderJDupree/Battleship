export type SessionID = string;
export type UserID = string;

export type Session = {
  username: string;
  userID: UserID;
  connected: boolean;
  expiry?: number;
};

export interface SessionStore {
  get: (sid: SessionID) => Session | undefined;
  set: (sid: SessionID, session: Session) => boolean;
  all: () => { sid: SessionID; session: Session }[];
  length: () => number;
  destroy: (sid: SessionID) => boolean;
  clear: () => void;
  touch: (sid: SessionID) => boolean;
}

export type MemorySessionOptions = {
  ttl: number;
};

export class MemorySessionStore implements SessionStore {
  store: Map<SessionID, Session>;
  opts: MemorySessionOptions;

  constructor(opts?) {
    this.store = new Map<SessionID, Session>();
    this.opts = opts || { ttl: 86400 };
  }

  get(sid: SessionID) {
    let session = this.store.get(sid);
    if (session) {
      if (Date.now() > session.expiry) {
        this.destroy(sid);
      } else {
        return session;
      }
    }
    return undefined;
  }

  set(sid: SessionID, session: Session) {
    let expiry = Date.now() + this.opts.ttl;
    this.store.set(sid, { ...session, expiry });
    return true;
  }

  all() {
    return Array.from(this.store, ([sid, session]) => ({ sid, session }));
  }

  destroy(sid: SessionID) {
    return this.store.delete(sid);
  }

  clear() {
    this.store.clear();
  }

  touch(sid: SessionID) {
    let session = this.get(sid);
    if (session) {
      session.expiry = Date.now() + this.opts.ttl;
      return true;
    } else {
      return false;
    }
  }

  length() {
    return this.store.size;
  }
}
