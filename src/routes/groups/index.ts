import * as express from "express";
export const groupRouter = express.Router();
import { groupController } from '../../server/controllers';
import * as  Valid from 'express-joi-validation';
import groupValidator from '../../server/middlewares/groupValidator';
import userGroupValidator from '../../server/middlewares/userGroupValidator';

const validator = Valid.createValidator({});

/* GET programming languages. */
groupRouter.get('/all', groupController.getAll);

groupRouter.get('/:id', groupController.get);

/* POST programming language */
groupRouter.post('/', groupValidator, groupController.create);

/* PUT programming language */
groupRouter.put('/:id', groupValidator , groupController.update);

/* DELETE programming language */
groupRouter.delete('/:id', groupController.remove);
groupRouter.post(
    '/:id/addUsers',
    userGroupValidator,
    groupController.addUsersToGroup
);
export default groupRouter;
