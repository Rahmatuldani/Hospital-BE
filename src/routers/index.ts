import express, { Router } from 'express';
import userRouters from './user';
import patientRouters from './patient';
import UserController from '../controllers/user';
import UserMiddlewares from '../middlewares/userValidation';

const routers: Router = express.Router();

routers.use('/users', userRouters);
routers.use('/patients', patientRouters);
routers.post('/login',UserMiddlewares.login, UserController.login);

export default routers;