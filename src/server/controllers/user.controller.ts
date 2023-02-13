import { Request, Response, NextFunction } from 'express';
import { userService } from  "../services/user.service";
import { ControllerLogger } from '../middlewares/controller.logger';

export class userController {
    @ControllerLogger()
    public static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const addedUser = await userService.addUser(req.body);
            res.status(201).json(addedUser);
        } catch (err) {
            return next(err);
        }
    }

    @ControllerLogger()
    public static async getAll(req: Request, res: Response, next: NextFunction): Promise<void>  {
        const { loginSubstring = '', limit = 10 } = req.query;

        try {
            const list = await userService.getAllUsers(loginSubstring, limit);

            res.send(list);
        } catch (err) {
            return next(err);
        }
    }

    @ControllerLogger()
    public static async get(req: Request, res: Response, next: NextFunction): Promise<void>  {
        try {
            const userToFind = userService.getUserById(req.params.id);

            if (!userToFind) {
                res.status(404).send('User not found');
            }

            res.send(userToFind);
        } catch (err) {
            return next(err);
        }
    }

    @ControllerLogger()
    public static async update(req: Request, res: Response, next: NextFunction): Promise<void>  {
        const updatedUser = req.body;
        try {
            const user = await userService.updateUser(updatedUser, req.params.id);
            if (!user) res.status(404).json({ mesage: 'User not found' });
            res.status(200).json(user);
        } catch (err) {
            return next(err);
        }
    }

    @ControllerLogger()
    public static async remove(req: Request, res: Response, next: NextFunction): Promise<void>  {
        try {
            const deletedUser = await userService.deleteUser(req.params.id);
            if (!deletedUser)
               res.status(404).json({ mesage: 'User not found' });
            res.status(200).json(deletedUser);
        } catch (err) {
          return next(err);
        }
    }
}