"use strict";
exports.__esModule = true;
exports.userRouter = void 0;
var express = require("express");
exports.userRouter = express.Router();
/* GET users listing. */
exports.userRouter.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
exports["default"] = exports.userRouter;
