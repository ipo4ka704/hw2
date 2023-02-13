import express from "express";
import * as bodyParser from "body-parser";
import userRouter from  './routes/user';
import groupRouter from  './routes/groups';
import { sequelize } from './server/config/sequelize';
import { uncaughtLogger, loggingMiddleware, errorMiddleware} from './server/middlewares/logger';

sequelize.drop();
sequelize.authenticate();
export const app = express();
app.use(loggingMiddleware);
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/groups', groupRouter);
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

