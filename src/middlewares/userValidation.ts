import { check } from 'express-validator';
import { Polyclinic, Role } from '../config/types';

const UserMiddlewares = (()=>{
    const login = [
        check('uid').exists().withMessage('UID is required'),
        check('password').exists().withMessage('Password is required')
    ];

    const userCreate = [
        check('email').exists().withMessage('Email is required'),
        check('name').exists().withMessage('Name is required'),
        check('role').exists().withMessage('Role is required'),
        check('phone').exists().withMessage('Phone number is required'),

        check('role').custom((value) => {
            if (!Role.includes(value)) {
                throw new Error('Role is unknown');
            }
            return true;
        }),
        
        check('polyclinic').optional().custom((value) => {
            if (!Polyclinic.includes(value)) {
                throw new Error('Polyclinic is unknown');
            }
            return true;
        })
    ];

    return {
        login,
        userCreate
    };
})();

export default UserMiddlewares;