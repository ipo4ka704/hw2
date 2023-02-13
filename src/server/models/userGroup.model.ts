import {
  Table,
  Column,
  Model,
  Unique,
  PrimaryKey,
  DataType,
  ForeignKey
} from 'sequelize-typescript';

import { UserModel } from './user.model';
import { GroupModel } from './group.model';

export interface IUserGroup {
  id: string;
  userId: string;
  groupId: string;
}

@Table({ tableName: 'usergroup' })
export class UserGroupModel extends Model<UserGroupModel> {
  @PrimaryKey
  @Unique
  @Column(DataType.STRING)
  id: string | undefined;

  @ForeignKey(() => UserModel)
  @Column(DataType.STRING)
  userId: string | undefined;

  @ForeignKey(() => GroupModel)
  @Column(DataType.STRING)
  groupId: string | undefined;
}