#!/usr/bin/env node
"use strict";
exports.__esModule = true;
require("module-alias/register");
var debug_1 = require("debug");
var debug = (0, debug_1["default"])('app-express:server');
var http = require("http");
var index_1 = require("./index");
var dotenv = require("dotenv");
dotenv.config();
var port = +(process.env.PORT || '3007');
index_1["default"].set('port', port);
var server = http.createServer(index_1["default"]);
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            process.exit(1);
            break;
        case 'EADDRINUSE':
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    console.log('listening on port ' + port);
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + (addr === null || addr === void 0 ? void 0 : addr.port) || '';
    debug('Listening on ' + bind);
}
function runApp(portRun) {
    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(portRun);
    server.on('error', onError);
    server.on('listening', onListening);
}
runApp(port);
exports["default"] = server;
