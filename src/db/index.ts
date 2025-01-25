import sequelize from '../config/db';
import { createModelAssosiations } from '../models';

const initializeDatabase = async (force: boolean) => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    createModelAssosiations(sequelize);
    console.log('Initialized models and their associations');

    if (process.env.NODE_ENV === 'DEV') {
      await sequelize.sync({ force: force });
      console.log('Database synced with force:', force);
    }
  } catch (err) {
    console.error('Failed to initialize database:', err);
  }
};

export default initializeDatabase;
