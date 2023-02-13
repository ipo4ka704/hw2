import {Sequelize} from "sequelize-typescript";
import { UserModel } from '../models/user.model';
import { UserGroupModel } from '../models/userGroup.model';
import { GroupModel } from '../models/group.model';
import config  from '../config/config';
export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: config.database.host,
    username: config.database.user,
    database: config.database.name,
    password: config.database.password,
    port: config.database.port,
    define: {
        timestamps: false
    }
});

sequelize.addModels([UserModel, GroupModel, UserGroupModel]);