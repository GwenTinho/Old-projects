let ctx = canvas.getContext('2d');
ctx.canvas.width = 1900;
ctx.canvas.height = 3000;
ctx.font = "20px Georgia";
ctx.fillStyle = "black";

function graph(fn, calculations) {
    let step = Math.ceil(ctx.canvas.width / calculations);
    for (let i = 1; i < step * calculations; i++) {
        ctx.beginPath();
        ctx.moveTo((i - 1) * step, ctx.canvas.height - fn((i - 1) / step));
        ctx.lineTo(step * i, ctx.canvas.height - fn(i / step));
        ctx.stroke();
    }
}
