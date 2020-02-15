function isPointInsidePolygon(coordArray, ray) {
    let f = false;
    for (let i = 0; i < coordArray.length; i++) {
        const next = i + 1,
            v1 = coordArray[i],
            v2 = (i + 1 >= coordArray.length) ? coordArray[0] : coordArray[next],
            slope = (v1.y - v2.y) / (v1.x - v2.x),
            yIntercept = v1.y - slope * v1.x,
            condX = (v1.x > v2.x) ? { lower: v2.x, upper: v1.x } : { lower: v1.x, upper: v2.x },
            condY = (v1.y > v2.y) ? { lower: v2.y, upper: v1.y } : { lower: v1.y, upper: v2.y },
            x = -(ray.point.y - ray.point.x * ray.slope - yIntercept) / (ray.slope - slope),
            y = ray.slope * (x - ray.point.x) + ray.point.y;
        if (condX.lower <= x && x <= condX.upper && condY.lower <= y && y <= condY.upper
            && ray.point.x <= x && ray.point.y <= y) f = !f;
    }
    return f;
}

let ctx = canvas.getContext('2d');
ctx.canvas.width = 1900;
ctx.canvas.height = 1000;
ctx.font = "20px Georgia";
ctx.fillStyle = "black";

let draw = {
    drawCircleAroundPoint: function (point, r) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, r, 0, 2 * Math.PI);
        ctx.fill();
    },
    drawPolygon: function (verticies) {
        if (verticies.length < 1) return;

        ctx.beginPath();
        let startpointX = verticies[0].x, startpointY = verticies[0].y;
        ctx.moveTo(startpointX, startpointY);
        verticies.forEach(vertex => {
            if (vertex.x !== startpointX || vertex.y !== startpointY) ctx.lineTo(vertex.x, vertex.y);
        });
        ctx.lineTo(startpointX, startpointY);
        ctx.stroke();
    },
    drawRay: function (ray) {
        if (ray.point === undefined) return;
        this.drawCircleAroundPoint(ray.point, 25);
        ctx.beginPath();
        ctx.moveTo(ray.point.x, ray.point.y);
        ctx.lineTo(2 * ctx.canvas.width, 2 * ctx.canvas.width * ray.slope + ray.point.y - ray.point.x * ray.slope);
        ctx.stroke();
    },
    drawData: function (data) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawPolygon(data.verticies);
        this.drawRay(data.ray);
    }
}

let data = {
    verticies: [],
    compareVertexCoordinates: function (pVertex1, pVertex2) {
        return pVertex1.x === pVertex2.x && pVertex1.y === pVertex2.y;
    },
    compareAllVerticies: function (pVerticies, comparison) {
        return !pVerticies.find(v => this.compareVertexCoordinates(v, comparison));
    },
    addVertex: function (x, y) {
        if (isNaN(x) || isNaN(y)) console.log("input is NAN");
        let input = { x, y };
        if (!this.verticies.length) this.verticies[0] = input;
        else if (this.compareAllVerticies(this.verticies, input)) this.verticies.push(input);
        else console.log("repeated vertex");
    },
    pointToCheck: {},
    makePoint: function (x, y) {
        this.pointToCheck.x = x;
        this.pointToCheck.y = y;
    },
    ray: {},
    makeRay(slope) {
        this.ray.slope = slope;
        this.ray.point = this.pointToCheck;
    },

}


document.getElementById("val").onmousemove = () => document.getElementById("val_out").innerText = parseInt(document.getElementById("val").value);
document.getElementById("form").addEventListener("click", e1 => {
    {
        if (e1.target.id === "drawmode") {
            callBack = e => {
                let x = e.layerX,
                    y = e.layerY;
                data.addVertex(x, y);
                draw.drawData(data);
            }
            return;
        }
        else if (e1.target.id === "raymode") {
            callBack = e => {
                let x = e.layerX,
                    y = e.layerY;
                data.makePoint(x, y);
                data.makeRay(Math.tan(Math.PI * parseInt(document.getElementById("val").value) / 180));
                draw.drawData(data);
            }
            return;
        }
    }
});

document.getElementById("canvas").addEventListener("click", e => callBack(e));


