import express, { Router } from 'express';
import UserController from '../controllers/user';
import UserMiddlewares from '../middlewares/userValidation';

const userRouters: Router = express.Router();

userRouters.get('/', UserController.getAllUser);
userRouters.post('/', UserMiddlewares.userCreate, UserController.createUser);
userRouters.put('/:id', UserMiddlewares.updateUser, UserController.updateUser);
userRouters.delete('/:id', UserMiddlewares.updateUser, UserController.deleteUser);

export default userRouters;