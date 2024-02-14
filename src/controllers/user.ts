import { Request, Response } from 'express';
import { UserAccount, UserType } from '../config/types';
import User from '../models/user';
import Respons from '../utils/respons';
import Hash from '../utils/hash';
import { validationResult } from 'express-validator';

const UserController = (() => {
    async function login(req: Request, res: Response) {
        try {
            const validationError = validationResult(req);
            if (!validationError.isEmpty()) {
                return Respons(res, { statusCode: 400, message: 'Validation Error', data: { error: validationError.array()[0].msg } });
            }

            const { email, password } = req.body;

            const userData: UserAccount | null = await User.findOne({email: email}).lean();
            if (!userData) {
                return Respons(res, {statusCode: 404, message: 'User not found'});
            }

            if (!Hash.decrypt(password, userData.password)) {
                return Respons(res, {statusCode: 401, message: 'Wrong Password'});
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: _, ...user } = userData;

            return Respons(res, {statusCode: 200, message: 'Login success', data: { user }});

        } catch (error) {
            return Respons(res, {statusCode: 500, message: 'Error Login', data: { error }});
        }
    }

    async function getAllUser(req: Request, res: Response) {
        try {
            const users: UserType[] = await User.find().select('-password').lean();

            return Respons(res, { statusCode: 200, message: 'Get all user success', data: { users } });
        } catch (error) {
            return Respons(res, {statusCode: 500, message: 'Error get all user', data: { error }});
        }
    }

    async function createUser(req: Request, res: Response) {
        try {
            const validationError = validationResult(req);
            if (!validationError.isEmpty()) {
                return Respons(res, { statusCode: 400, message: 'Validation Error', data: { error: validationError.array()[0].msg } });
            }

            const data: UserAccount = req.body;
            data.password = Hash.encrypt(data.name.trim().toLowerCase());

            const existUser = await User.findOne({email: data.email});
            if (existUser) {
                return Respons(res, { statusCode: 400, message: 'Email is already exist' });
            }

            await User.create(data);
            const user = await User.findOne({email: data.email}).lean().select('-password');
            return Respons(res, { statusCode: 201, message: 'Create user success', data: {user} });

        } catch (error) {
            return Respons(res, {statusCode: 500, message: 'Error create user', data: { error }});
        }
    }

    async function updateUser(req: Request, res: Response) {
        const validationError = validationResult(req);
        if (!validationError.isEmpty()) {
            return Respons(res, { statusCode: 400, message: 'Validation Error', data: { error: validationError.array()[0].msg } });
        }
        try {
            const { id } = req.params;
            const data: UserType = req.body;

            const user = await User.findByIdAndUpdate(id, data, { new: true }).select('-password');
            if (!user) {
                return Respons(res, {statusCode: 404, message: 'User not found'});
            }

            return Respons(res, {statusCode: 200, message: 'Update user success', data: { user }});
        } catch (error) {
            return Respons(res, {statusCode: 500, message: 'Error create user', data: { error }});
        }
    }

    async function deleteUser(req: Request, res: Response) {
        const validationError = validationResult(req);
        if (!validationError.isEmpty()) {
            return Respons(res, { statusCode: 400, message: 'Validation Error', data: { error: validationError.array()[0].msg } });
        }
        try {
            const { id } = req.params;
            
            const user = await User.findByIdAndDelete(id).lean().select('_id');
            if (!user) {
                return Respons(res, {statusCode: 404, message: 'User not found' });
            }
            return Respons(res, {statusCode: 200, message: 'Delete user success', data: user });
        } catch (error) {
            return Respons(res, {statusCode: 500, message: 'Error create user', data: { error }});
        }
    }

    return {
        login,
        getAllUser,
        createUser,
        updateUser,
        deleteUser
    };
})();

export default UserController;