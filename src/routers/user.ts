import express, { Router } from 'express';
import UserController from '../controllers/user';

const userRouters: Router = express.Router();

userRouters.get('/', UserController.getAllUser);

export default userRouters;