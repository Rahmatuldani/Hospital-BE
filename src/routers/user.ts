import express, { Router } from 'express';
import UserController from '../controllers/user';
import UserMiddlewares from '../middlewares/userValidation';

const userRouters: Router = express.Router();

userRouters.post('/:id/login', UserMiddlewares.login, UserController.login);
userRouters.get('/', UserController.getAllUser);
userRouters.post('/', UserMiddlewares.userCreate, UserController.createUser);
userRouters.put('/:id', UserController.updateUser);
userRouters.delete('/:id', UserController.deleteUser);

export default userRouters;