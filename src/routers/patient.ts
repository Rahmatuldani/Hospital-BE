import express, { Router } from 'express';
import PatientController from '../controllers/patient';
import PatientMiddlewares from '../middlewares/patientValidator';

const patientRouters: Router = express.Router();

patientRouters.get('/', PatientController.getAllPatients);
patientRouters.post('/', PatientMiddlewares.createPatient, PatientController.createPatient);
patientRouters.put('/:id', PatientMiddlewares.updatePatient, PatientController.updatePatient);
patientRouters.delete('/:id', PatientController.deletePatient);

export default patientRouters;