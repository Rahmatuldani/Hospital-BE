import express, { Router } from 'express';
import userRouters from './user';

const routers: Router = express.Router();

routers.use('/users', userRouters);

export default routers;