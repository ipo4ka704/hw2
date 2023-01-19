import {
  Table,
  Column,
  Model,
  Unique,
  PrimaryKey,
  Default,
  DataType
} from 'sequelize-typescript';


export interface IUser {
  id: string;
  login: string;
  password: string;
  age: number;
  isdeleted: boolean;
}

export interface IUserSearch {
  loginSubstring: string;
  limit: number;
}
@Table({ tableName: 'users' })

export class UserModel extends Model<UserModel> {
  @PrimaryKey
  @Unique
  @Column(DataType.STRING)
  id: string | undefined;

  @Column(DataType.STRING)
  login: string | undefined;

  @Column(DataType.STRING)
  password: string | undefined;

  @Column(DataType.INTEGER)
  age: number | undefined;

  @Default(false)
  @Column(DataType.BOOLEAN)
  isdeleted: boolean | undefined;
}