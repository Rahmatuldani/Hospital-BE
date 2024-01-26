import { Request, Response } from 'express';

const UserController = (() => {
    function getAllUser(req: Request, res: Response) {
        try {
            return res.status(200).json({ message: 'success' });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    return {
        getAllUser
    };
})();

export default UserController;