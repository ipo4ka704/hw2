import express from "express";
import * as bodyParser from "body-parser";
// import * as logger from "morgan";
import userRouter from  './routes/user';
import groupRouter from  './routes/groups';
import { sequelize } from './server/config/sequelize';

sequelize.drop();
sequelize.authenticate();
export const app = express();

// app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/groups', groupRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({message: 'Internal server error', error: err});
    next
});
export default app;

