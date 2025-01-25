import http from 'http';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import initializeDatabase from './db';
import v1Router from './routes/v1';
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000;

// Register middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Register routes
app.use('/v1', v1Router);

// Start and run the server
const runServer = async () => {
  await initializeDatabase(false);

  try {
    const server: http.Server = app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed while starting the server:', err);
    process.exit(1);
  }
};

runServer();
