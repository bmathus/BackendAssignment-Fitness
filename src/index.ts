import http from 'http';
import errorHandler from './middlewares/error.middleware';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import initializeDatabase from './db';
import v1Router from './routes/v1';
import i18n from './config/i18n';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000;

app.use(i18n.init); // Localization middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/v1', v1Router);
app.use(errorHandler);

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
