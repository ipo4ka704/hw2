import * as Joi from 'joi';
import app from "./index";

const dataSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required().alphanum(),
    age: Joi.number().required().min(4).max(130),
});

export default dataSchema;