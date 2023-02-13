import {
  Table,
  Column,
  Model,
  Unique,
  PrimaryKey,
  Default,
  DataType
} from 'sequelize-typescript';

export enum Permission {
  Read = 'READ',
  Write = 'WRITE',
  Delete = 'DELETE',
  Share = 'SHARE',
  UploadFiles = 'UPLOAD_FILES'
}
export interface IGroup {
  id: string;
  name: string;
  permission: Array<Permission>;
}

@Table({ tableName: 'group' })

export class GroupModel extends Model<GroupModel> {
  @PrimaryKey
  @Unique
  @Column(DataType.STRING)
  id: string | undefined;

  @Column(DataType.STRING)
  name: string | undefined;

  @Column(DataType.ARRAY(DataType.STRING))
  permissions: Array<Permission> | undefined;
}