import { Request, Response } from 'express';
import { UserType } from '../config/types';
import User from '../models/user';

const UserController = (() => {
    async function getAllUser(req: Request, res: Response) {
        try {
            const users: UserType[] = await User.find();

            return res.status(200).json({ message: 'success', data: { users } });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    return {
        getAllUser
    };
})();

export default UserController;