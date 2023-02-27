import * as express from "express";
export const loginRoute = express.Router();
import { loginController } from '../server/controllers';
import loginValidator from '../server/middlewares/login.validator'
import * as  Valid from 'express-joi-validation';

loginRoute.post('/', loginValidator, loginController.login);

export default loginRoute;
