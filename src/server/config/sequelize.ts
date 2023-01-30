import {Sequelize} from "sequelize-typescript";
import { UserModel } from '../models/User.model';
import { UserGroupModel } from '../models/UserGroup.model';
import { GroupModel } from '../models/Group.model';
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