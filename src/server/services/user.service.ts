import { Op } from 'sequelize';
import { v1 as uuid } from 'uuid';

import { IUser, UserModel } from '../models/user.model';

export class userService {
    public static async getAllUsers(
        loginSubstring: string,
        limit: number
    ): Promise<UserModel[]> {
        return UserModel.findAll<UserModel>({
            where: {
                isdeleted: false,
                login: {
                    [Op.iLike]: `%${loginSubstring}%`,
                },
            },
            attributes: { exclude: ['password'] },
            limit
        });
    }

    public static async getUserById(id: string): Promise<UserModel | null> {
        return UserModel.findOne({
            where: {
                id,
                isdeleted: false
            },
            attributes: { exclude: ['password'] }
        });
    }

    public static async addUser(user: IUser): Promise<UserModel> {
        return UserModel.create({ ...user, id: uuid(), isdeleted: false });
    }

    public static async updateUser(
        updatedUser: UserModel,
        id: string
    ): Promise<UserModel> {
        const { login, password, age } = updatedUser;
        return UserModel.update(
            {
                login,
                password,
                age
            },
            {
                where: {
                    id,
                    isdeleted: false
                },
                returning: true
            }
        ).then(([rowsUpdated, [user]]) => user);
    }

    public static async deleteUser(id: string): Promise<UserModel | null> {
        return UserModel.update(
            {
                isdeleted: true
            },
            {
                where: {
                    id,
                    isdeleted: false
                },
                returning: true
            }
        ).then(([rowsUpdated, [user]]) => user);
    }
}