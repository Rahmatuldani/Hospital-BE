import dotenv from 'dotenv';

dotenv.config();

const app = {
    name: process.env.APP_NAME ?? 'Hospital Server',
    port: process.env.APP_PORT ?? 5000
};

export default app;