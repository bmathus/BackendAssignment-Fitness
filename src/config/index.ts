import dotenv from 'dotenv';
dotenv.config();

const config = {
  // Environment
  NODE_ENV: process.env.NODE_ENV || 'DEV',

  // Server
  PORT: Number(process.env.PORT) || 8000,

  // Database
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_NAME: process.env.DB_NAME || 'fitness_app',
  DB_USER: process.env.DB_USER || 'fitness_user',
  DB_PASSWORD: process.env.DB_PASSWORD || 'fitness_pass',

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'super_secret_jwt_secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
} as const;

export default config;
