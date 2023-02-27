import { ControllerLogger } from'../middlewares/controller.logger';
import { userService } from  "../services/user.service";
import jwt from 'jsonwebtoken';
import config from '../config/config';
export class loginController {
  @ControllerLogger()
  public static async login(req: Request, res: Response): Promise<void> {
        try {
          const { login, password } = req.body;
          const user = await userService.getUserByCredentials(login, password);
          console.log(user);
          if (!user) {
            res.status(400).send('Incorrect login and/or password have beed provided');
          } else {
            jwt.sign({ login, password }, config.jwtSecret, (err: Error, token: string) => {
            if (err) {
              throw err;
            }
            res.status(200).send({ token });
          });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
        throw Error(err.message);
    }
  }
}