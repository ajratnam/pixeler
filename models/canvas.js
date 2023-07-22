const Canvas = {
    canvas: [],
    canvasWidth: 1500,
    canvasHeight: 750,
    defaultColor: [0, 0, 0],
    resetCanvas: function() {
        this.canvas.length = 0;
        for (let i = 0; i < this.canvasHeight; i++) this.canvas.push(new Array(this.canvasWidth).fill(this.defaultColor));
    }
}

module.exports = Canvas;