import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import { IGroup, Permission } from '../models/group.model';

const groupSchema = Joi.object({
    name: Joi.string().required(),
    permissions: Joi.array().unique().min(1).max(5).items(
        Joi.string().valid(Permission.Read),
        Joi.string().valid(Permission.Write),
        Joi.string().valid(Permission.Delete),
        Joi.string().valid(Permission.Share),
        Joi.string().valid(Permission.UploadFiles),
    ).required(),
});

const groupValidator = (schema: Joi.ObjectSchema<IGroup>) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body);

        if (error?.isJoi) {
            res.status(400).json(error.message);
        } else {
            return next();
        }
    };
};

export default groupValidator(groupSchema);