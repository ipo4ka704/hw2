import { Transaction } from 'sequelize';
import { v1 as uuid } from 'uuid';

import { GroupModel } from '../models/group.model';
import { UserModel } from '../models/user.model';
import { UserGroupModel } from '../models/userGroup.model';
import { sequelize } from '../config/sequelize';

export class UserGroupService {
    public static async addUsersToGroup(groupId: string, userIds: string[]) {
        return sequelize.transaction(async (t: Transaction) => {
            const groupRecord = await GroupModel.findByPk(groupId, {
                transaction: t,
                raw: true
            });
            const userRecords = await UserModel.findAll({
                where: { id: userIds },
                transaction: t,
                raw: true
            });
            if (groupRecord) {
                return Promise.all(
                    userRecords.map(user => {
                        console.log(user);
                        return UserGroupModel.create(
                            { id: uuid(), userId: user.id, groupId: groupRecord.id },
                            { transaction: t }
                        );
                    })
                );
            } else {
                return Error('Group was not found');
            }
        });
    }
}