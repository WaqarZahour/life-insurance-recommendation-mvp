import { Sequelize } from 'sequelize-typescript';
import { Recommendation } from '../models/Recommendation';

const DB_URL = 'postgresql://neondb_owner:npg_5LOJyxr8IlRA@ep-patient-dawn-ad5r454d-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

console.log('DATABASE_URL:', DB_URL); // Debug print

const sequelize = new Sequelize(
  DB_URL,
  {
    dialect: 'postgres',
    models: [Recommendation],
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

export const testConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
};

export const syncDatabase = async (): Promise<void> => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized successfully.');
  } catch (error) {
    console.error('❌ Error synchronizing database:', error);
    throw error;
  }
};

export default sequelize; 