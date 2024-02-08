import { check, param } from 'express-validator';
import Patient from '../models/patient';
import { Types } from 'mongoose';

const PatientMiddlewares = (() => {
    const createPatient = [
        check('nik').exists().withMessage('NIK is required'),
        check('nik').custom(async (value) => {
            const patient = await Patient.findOne({nik: value});
            if (patient) {
                throw new Error('NIK already exist');
            }
        }),

        check('name').exists().withMessage('Name is required'),
        check('birthPlace').exists().withMessage('Birth Place is required'),
        check('birthDate').exists().withMessage('Birth Date is required'),
        check('sex').exists().withMessage('Sex is required'),
        check('address').exists().withMessage('Address is required'),
        check('religion').exists().withMessage('Religion is required'),
        check('married').exists().withMessage('Married status is required'),
        check('citizenship').exists().withMessage('Citizenship is required'),
        check('phone').exists().withMessage('Phone is required'),
        check('parent').exists().withMessage('Parent is required'),
    ];

    const updatePatient = [
        param('id').custom(async (value) => {
            if (!Types.ObjectId.isValid(value)) {
                throw new Error('ID is invalid');
            }
        }),
    ];

    return {
        createPatient,
        updatePatient
    };
})();

export default PatientMiddlewares;