import * as express from "express";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import userRouter from  './routes/user';

export const app = express();
console.log()

app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({message: 'Internal server error', error: err});
    next
});
export default app;

