import { Request, Response } from 'express';
import { UserAccount, UserType } from '../config/types';
import User from '../models/user';
import Respons from '../utils/respons';
import Hash from '../utils/hash';
import { validationResult } from 'express-validator';
import { Types, Document } from 'mongoose';

const UserController = (() => {
    async function login(req: Request, res: Response) {
        try {
            const validationError = validationResult(req);
            if (!validationError.isEmpty()) {
                return Respons(res, { statusCode: 400, message: 'Validation Error', data: { error: validationError.array()[0].msg } });
            }

            const { id } = req.params;
            const { password } = req.body;
            if (!Types.ObjectId.isValid(id)) {
                return Respons(res, {statusCode: 400, message: 'User ID invalid'});
            }

            const data: Document | null = await User.findById(id);
            if (!data) {
                return Respons(res, {statusCode: 404, message: 'User not found'});
            }

            const userData: UserAccount = data.toObject();

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
            const users: UserType[] = await User.find().select('-password').sort('uid');

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
            data.password = Hash.encrypt(data.uid);

            const existUser = await User.findOne({uid: data.uid});
            if (existUser) {
                return Respons(res, { statusCode: 400, message: 'UID is already exist' });
            }

            await User.create(data);
            return Respons(res, { statusCode: 201, message: 'Create user success' });

        } catch (error) {
            return Respons(res, {statusCode: 500, message: 'Error create user', data: { error }});
        }
    }

    async function updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!Types.ObjectId.isValid(id)) {
                return Respons(res, {statusCode: 400, message: 'User ID invalid'});
            }
            const data: UserType = req.body;

            const user = await User.findOneAndUpdate({ _id: id }, { $set: data }, { new: true }).select('-password');
            if (!user) {
                return Respons(res, {statusCode: 404, message: 'User not found'});
            }

            return Respons(res, {statusCode: 200, message: 'Update user success', data: { user }});
        } catch (error) {
            return Respons(res, {statusCode: 500, message: 'Error create user', data: { error }});
        }
    }

    async function deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            
            const user = await User.findById(id);
            if (!user) {
                return Respons(res, {statusCode: 404, message: 'User not found' });
            }

            await User.deleteOne({_id: id});
            return Respons(res, {statusCode: 200, message: 'Delete user success' });
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