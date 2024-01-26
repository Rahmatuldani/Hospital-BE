import express, { Express } from 'express';
import cors from 'cors';
import app from './config/app';
import routers from './routers';

const server: Express = express();

server.use(express.json());
server.use(cors());
server.use('/api', routers);

server.listen(app.port, () => console.log(`Server listen on port ${app.port}`));
