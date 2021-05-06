/**
 * Battleship server configuration file
 */
import cors from 'cors';

export const CLIENT_PORT = process.env.PORT || 3000;

export const PORT = process.env.SERVER_PORT || 8080;

export const SECRET = process.env.SECRET || 'development-key';

export const ALLOWED_ORIGINS =
  process.env.ALLOWED_ORIGINS || `http://localhost:${CLIENT_PORT}`;

export const CORS_OPTIONS: cors.CorsOptions = {
  origin: ALLOWED_ORIGINS.split(',').map((s) => new RegExp(s)),
  methods: ['GET', 'POST'],
};
