import express, { Router } from 'express';
import userRouters from './user';
import patientRouters from './patient';

const routers: Router = express.Router();

routers.use('/users', userRouters);
routers.use('/patients', patientRouters);

export default routers;