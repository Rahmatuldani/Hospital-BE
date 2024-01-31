import { Request, Response } from 'express';
import Respons from '../utils/respons';
import { PatientType } from '../config/types';
import Patient from '../models/patient';
import { validationResult } from 'express-validator';

const PatientController = (() => {
    async function getAllPatients(req: Request ,res: Response) {
        try {
            const patients: PatientType[] = await Patient.find();
            return Respons(res, { statusCode: 200, message: 'Get all patients success', data: { patients }});
        } catch (error) {
            return Respons(res, { statusCode: 500, message: 'Error get all patients', data: { error }});
        }
    }

    async function createPatient(req: Request, res: Response) {
        const validationError = validationResult(req);
        if (!validationError.isEmpty()) {
            return Respons(res, { statusCode: 400, message: 'Validation Error', data: { error: validationError.array()[0].msg } });
        }

        try {
            const data: PatientType = req.body;
            const patient = await Patient.create(data);
            return Respons(res, { statusCode: 200, message: 'Success create patient', data: { patient }});
        } catch (error) {
            return Respons(res, { statusCode: 500, message: 'Error create patient', data: { error }});
        }
    }
    
    async function deletePatient(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const patient = await Patient.deleteOne({_id: id});
            if (patient.deletedCount > 0) {
                return Respons(res, { statusCode: 200, message: 'Delete patient success' });
            }
            return Respons(res, { statusCode: 404, message: 'Patient not found' });
        } catch (error) {
            return Respons(res, { statusCode: 500, message: 'Error delete patient', data: { error }});
        }
    }

    return {
        getAllPatients,
        createPatient,
        deletePatient
    };
})();

export default PatientController;