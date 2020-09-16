import { Sequelize } from 'sequelize-typescript';
import User from './users.model';

export const sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_PATH,
    dialect: 'postgres',
    timezone: '-03:00',
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    },
    pool: {
      min: 0,
      max: 30,
      idle: 10000,
      acquire: 30000
    }
  }
);

sequelize.addModels([User]);
