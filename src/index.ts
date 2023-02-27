import express from "express";
import * as bodyParser from "body-parser";
import userRouter from  './routes/user';
import groupRouter from  './routes/groups';
import loginRoute from  './routes/login';
import { sequelize } from './server/config/sequelize';
import cors from 'cors';
import { uncaughtLogger, loggingMiddleware, errorMiddleware} from './server/middlewares/logger';
import { jwtMiddleware } from "./server/middlewares/jwt.middleware"
const corsOptions: cors.CorsOptions = {
    methods: 'GET,PUT,POST,DELETE',
    origin: '*'
};
sequelize.drop();
sequelize.authenticate();
export const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(loggingMiddleware);
app.use(jwtMiddleware);

app.use('/user', userRouter);
app.use('/groups', groupRouter);
app.use('/login', loginRoute);
app.use('/', (req, res) => {
    res.sendStatus(200)
});

app.use(errorMiddleware);

process.on('uncaughtException', err => {
    uncaughtLogger.error(
        'There is uncaught exception inside application',
        { errorMessage: err.message, stacktrace: err.stack }
    );
});

process.on('unhandledRejection', reason => {
    uncaughtLogger.error(
        'There is unhandled promise rejection inside application',
        reason
    );
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({message: 'Internal server error', error: err});
    next
});
export default app;

