import dotenv from 'dotenv';

dotenv.config();

const app = {
    name: process.env.APP_NAME ?? 'Hospital Server',
    port: process.env.APP_PORT ?? 5000,

    db_host: process.env.DB_URL ?? 'mongodb://127.0.0.1:27017',
    db_name: process.env.DB_NAME ?? 'hospital'
};

export default app;