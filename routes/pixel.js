const express = require('express');
const router = express.Router();
const canvas = require('../models/canvas');
const {socket} = require('../socket_app');

router.get('/get_all', (req, res) => {
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Length', canvas.canvasWidth * canvas.canvasHeight * 3);
    res.end(Buffer.from(canvas.canvas.flat(2)));
});

router.get('/get', (req, res) => {
    const {x, y} = req.query;
    if (x === undefined || y === undefined) {
        res.status(400).json({error: 'Missing parameters'});
    } else if (!Number.isInteger(x) || !Number.isInteger(y)) {
        res.status(400).json({error: 'Invalid Coordinates'});
    } else if (x < 0 || x >= canvas.canvasWidth || y < 0 || y >= canvas.canvasHeight) {
        res.status(400).json({error: 'Coordinates out of bounds'});
    } else {
        res.status(200).json({x: x, y: y, color: canvas.canvas[y][x]});
    }
});

router.post('/set', (req, res) => {
    const {x, y, color} = req.body;

    if (x === undefined || y === undefined || color === undefined) {
        res.status(400).json({error: 'Missing parameters'});
    } else if (!Number.isInteger(x) || !Number.isInteger(y)) {
        res.status(400).json({error: 'Invalid Coordinates'});
    } else if (!Array.isArray(color)) {
        res.status(400).json({error: 'Invalid color'});
    } else if (x < 0 || x >= canvas.canvasWidth || y < 0 || y >= canvas.canvasHeight) {
        res.status(400).json({error: 'Coordinates out of bounds'});
    } else if (color.length !== 3 || color.some(c => !Number.isInteger(c) || c < 0 || c > 255)) {
        res.status(400).json({error: 'Invalid color'});
    } else {
        canvas.canvas[y][x] = color;
        res.status(200).json({x: x, y: y, color: color});
        socket.emit('pixel', {x: x, y: y, color: color});
    }
});

module.exports = router;