import http from 'http';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import initializeDatabase from './db';
import ProgramRouter from './routes/programs';
import ExerciseRouter from './routes/exercises';
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000;

// Register middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Register routes
app.use('/programs', ProgramRouter());
app.use('/exercises', ExerciseRouter());

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
