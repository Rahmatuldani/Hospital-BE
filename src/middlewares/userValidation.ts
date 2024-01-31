import { check } from 'express-validator';
import { Division, Polyclinic } from '../config/types';

const UserMiddlewares = (()=>{
    const login = [
        check('uid').exists().withMessage('UID is required'),
        check('password').exists().withMessage('Password is required')
    ];

    const userCreate = [
        check('uid').exists().withMessage('UID is required'),
        check('name').exists().withMessage('Name is required'),
        check('division').exists().withMessage('Division is required'),
        check('phone').exists().withMessage('Phone number is required'),

        check('division').custom((value) => {
            if (!Division.includes(value)) {
                throw new Error('Division is unknown');
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