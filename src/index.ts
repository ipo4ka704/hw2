import express from "express";
import * as bodyParser from "body-parser";
// import * as logger from "morgan";
import userRouter from  './routes/user';
import {Sequelize} from "sequelize-typescript";
import { UserModel } from './server/models/user.model';
import config  from './server/config/config';
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: config.database.host,
    username: config.database.user,
    database: config.database.name,
    password: config.database.password,
    port: config.database.port,
    define: {
        timestamps: false
    }
});
sequelize.drop();

sequelize.addModels([UserModel]);

sequelize.authenticate();


export const app = express();
console.log()

// app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({message: 'Internal server error', error: err});
    next
});
export default app;

