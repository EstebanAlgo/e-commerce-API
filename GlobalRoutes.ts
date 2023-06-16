import dotenv from 'dotenv';
dotenv.config();
export const GlobalRoutes = {
    HOST: process.env.HOST || '',
    PORT: process.env.PORT || '',
    DB_HOST: process.env.DB_HOST || '',
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
 
}