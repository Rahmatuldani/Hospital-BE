import express, { Express } from 'express';
import cors from 'cors';
import app from './config/app';
import routers from './routers';
import db from './config/db';

const server: Express = express();

server.use(express.json());
server.use(cors());
server.use('/api', routers);

db.then(() => {
    server.listen(app.port, () => console.log(`Server listen on port ${app.port}`));
}).catch(err => console.log('Database connection error : ', err)
);
