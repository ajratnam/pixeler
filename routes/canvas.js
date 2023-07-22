const express = require('express');
const router = express.Router();
const canvas = require('../models/canvas');

router.get('/size', (req, res) => {
    res.json({width: canvas.canvasWidth, height: canvas.canvasHeight});
});

router.post('/reset', (req, res) => {
    canvas.resetCanvas();
    res.status(200).json({message: 'Canvas reset'});
});

module.exports = router;