const express = require('express');
const app = express();


const canvasWidth = 1500;
const canvasHeight = 750;
let canvas = [];

function resetCanvas() {
    canvas.length = 0;
    for (let i = 0; i < canvasHeight; i++)
        canvas.push(new Array(canvasWidth).fill([0, 0, 0]));
}

resetCanvas();
app.use(express.json());


app.get('/canvas/size', (req, res) => {
    res.json({width: canvasWidth, height: canvasHeight});
});


app.post('/canvas/reset', (req, res) => {
    resetCanvas();
    res.status(200).json({message: 'Canvas reset'});
});


app.get('/pixel/get_all', (req, res) => {
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Length', canvasWidth * canvasHeight * 3);
    res.end(Buffer.from(canvas.flat(2)));
});


app.get('/pixel/get', (req, res) => {
    const {x, y} = req.query;
    if (x === undefined || y === undefined) {
        res.status(400).json({error: 'Missing parameters'});
    } else if (!Number.isInteger(x) || !Number.isInteger(y)) {
        res.status(400).json({error: 'Invalid Coordinates'});
    } else if (x < 0 || x >= canvasWidth || y < 0 || y >= canvasHeight) {
        res.status(400).json({error: 'Coordinates out of bounds'});
    } else {
        res.status(200).json({x: x, y: y, color: canvas[y][x]});
    }
});


app.post('/pixel/set', (req, res) => {
    const {x, y, color} = req.body;

    if (x === undefined || y === undefined || color === undefined) {
        res.status(400).json({error: 'Missing parameters'});
    } else if (!Number.isInteger(x) || !Number.isInteger(y)) {
        res.status(400).json({error: 'Invalid Coordinates'});
    } else if (!Array.isArray(color)) {
        res.status(400).json({error: 'Invalid color'});
    } else if (x < 0 || x >= canvasWidth || y < 0 || y >= canvasHeight) {
        res.status(400).json({error: 'Coordinates out of bounds'});
    } else if (color.length !== 3 || color.some(c => !Number.isInteger(c) || c < 0 || c > 255)) {
        res.status(400).json({error: 'Invalid color'});
    } else {
        canvas[y][x] = color;
        res.status(200).json({x: x, y: y, color: color});
    }
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
