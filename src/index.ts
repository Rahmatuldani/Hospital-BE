import express, { Express, Request, Response } from 'express';
import app from './config/app';

const server: Express = express();

server.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'ok' });
});

server.listen(app.port, () => console.log(`Server listen on port ${app.port}`));
