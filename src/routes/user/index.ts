import * as express from "express";
export const userRouter = express.Router();
import { userController } from '../../server/controllers';
import dataSchema from '../../schema';
import * as  Valid from 'express-joi-validation';

const validator = Valid.createValidator({});

/* GET programming languages. */
userRouter.get('/all', userController.getAll);

userRouter.get('/:id', userController.get);

/* POST programming language */
userRouter.post('/', validator.body(dataSchema), userController.create);

/* PUT programming language */
userRouter.put('/:id', validator.body(dataSchema) , userController.update);

/* DELETE programming language */
userRouter.delete('/:id', userController.remove);

export default userRouter;
