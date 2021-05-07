/**
 * Functions, constants, and types that don't quite fit nicely in other files
 */

export type ServerStats = {
  playersOnline: number;
  activeGames: number;
  gamesPlayed: number;
};

export type Leaderboard = { username: string; wins: number }[];

export enum JoinGameStatus {
  Error,
  JoinSuccess,
  GameCreated,
}

export enum RoomStatus {
  NotFound,
  RoomFull,
  Ok,
}

export const USERNAME_MAX_CHARS = 30;
export const USERNAME_REGEX = /^[a-zA-Z0-9_]*$/;

export enum UsernameError {
  InvalidCharacters = 'Username should only contain alphanumeric characters and underscores',
  TooLong = 'Username is too long',
  NotPresent = 'No username present',
}

export const validateUsername = (username?: string): true | UsernameError => {
  if (!username) {
    return UsernameError.NotPresent;
  }
  if (username.length > USERNAME_MAX_CHARS) {
    return UsernameError.TooLong;
  }
  if (!USERNAME_REGEX.test(username)) {
    return UsernameError.InvalidCharacters;
  }
  return true;
};
