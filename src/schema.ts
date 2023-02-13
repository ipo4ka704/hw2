import * as Joi from 'joi';
import {IUser} from "./server/models/user.model";

const dataSchema: Joi.ObjectSchema<IUser> = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required().alphanum(),
    age: Joi.number().required().min(4).max(130),
});

export default dataSchema;