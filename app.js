const express = require('express');
const app = express();

const pixelRouter = require('./routes/pixel');
const canvasRouter = require('./routes/canvas');

const canvas = require('./models/canvas');


canvas.resetCanvas();
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use('/pixel', pixelRouter);
app.use('/canvas', canvasRouter);


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
