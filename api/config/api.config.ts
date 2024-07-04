// config.js
import dotenv from 'dotenv';

dotenv.config();

export const BASE_URL = 'https://api.spotify.com/v1';
export const TOKEN_BASE_URL = 'https://accounts.spotify.com/api';
export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const REDIRECT_URI = process.env.REDIRECT_URI;
export const SCOPE = process.env.SCOPE;
export const STATE_KEY = 'spotify_auth_state';
export const MARKET = 'US';
export const LOW_LIMIT = 12;
export const DEFAULT_LIMIT = 28;
export const CLIENT_URL = process.env.CLIENT_DV;
