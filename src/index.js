"use strict";
exports.__esModule = true;
exports.app = void 0;
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var user_1 = require("./routes/user");
exports.app = express();
console.log();
exports.app.use(logger('dev'));
exports.app.use(bodyParser.json());
exports.app.use('/user', user_1["default"]);
exports.app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({ message: 'Internal server error', error: err });
    next;
});
exports["default"] = exports.app;
