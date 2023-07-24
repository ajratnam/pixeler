const {app} = require('./socket_app');
const {json} = require("express");

const pixelRouter = require('./routes/pixel');
const canvasRouter = require('./routes/canvas');

const canvas = require('./models/canvas');


canvas.resetCanvas();
app.use(json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use('/pixel', pixelRouter);
app.use('/canvas', canvasRouter);