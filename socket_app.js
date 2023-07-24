const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const {Server} = require('socket.io')
const socket = new Server(httpServer);

module.exports = {
    app: app,
    socket: socket,
    server: httpServer
};