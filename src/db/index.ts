import config from '../config';
import sequelize from '../config/db';
import { createModelAssociations } from '../models';

const initializeDatabase = async (force: boolean) => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    createModelAssociations();
    console.log('Initialized models and their associations');

    if (config.NODE_ENV === 'DEV') {
      await sequelize.sync({ force: force });
      console.log('Database synced with force:', force);
    }
  } catch (err) {
    console.error('Failed to initialize database:', err);
  }
};

export default initializeDatabase;
