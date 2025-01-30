import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import config from '.';

dotenv.config();

const sequelize: Sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

export default sequelize;
