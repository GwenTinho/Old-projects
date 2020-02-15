let ctx = canvas.getContext('2d');
ctx.canvas.width = 1900;
ctx.canvas.height = 1000;
ctx.font = "20px Georgia";

let data = {
    verticies: [],
    compareVertexCoordinates: function (pVertex1, pVertex2) {
        return pVertex1.x === pVertex2.x && pVertex1.y === pVertex2.y;
    },
    compareAllVerticies: function (pVerticies, comparison) {
        return !pVerticies.find(v => this.compareVertexCoordinates(v, comparison));
    },
    addVertex: function (x, y, val) {
        if (isNaN(x) || isNaN(y) || isNaN(val)) console.log("input is NAN");
        let input = { x, y, val };
        if (!this.verticies.length) this.verticies[0] = input;
        else if (this.compareAllVerticies(this.verticies, input)) this.verticies.push(input);
        else console.log("repeated vertex");
    },
    distributeDollar: function (vertex) {
        let includesVertex = this.relations.filter(r => this.compareVertexCoordinates(r.vertex1, vertex) || this.compareVertexCoordinates(r.vertex2, vertex));
        vertex.val -= includesVertex.length;
        includesVertex.forEach(r => {
            if (this.compareVertexCoordinates(r.vertex1, vertex)) r.vertex2.val++;
            else r.vertex1.val++;
        });
        drawData(data);
    },
    relations: [],
    compareRelations: function (relation1, relation2) {
        return this.compareVertexCoordinates(relation1.vertex1, relation2.vertex1) && this.compareVertexCoordinates(relation1.vertex2, relation2.vertex2);
    },
    compareAllRelations: function (pRelations, comparison) {
        return !pRelations.find(r => this.compareRelations(r, comparison));
    },
    addRelation: function (vertex1, vertex2) {
        let input = { vertex1, vertex2 };
        if (!this.relations.length) this.relations[0] = input;
        else if (this.compareAllRelations(this.relations, input)) this.relations.push(input);
        else console.log("repeated relation");
    },
    isWinnable: function () {
        if (this.relations.length && this.verticies.length) {
            return this.relations.length - this.verticies.length + 1 <= this.verticies.map(vertex => vertex.val).reduce((acc, currVal) => acc + currVal);
        }
        else return false;
    }
}

function drawCircleAroundPoint(pVertex, r) {
    ctx.beginPath();
    ctx.arc(pVertex.x, pVertex.y, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillText(pVertex.val, pVertex.x, pVertex.y);
    ctx.fill();
    ctx.fillStyle = "black";
}
function drawLineFromRelation(pRelation) {
    ctx.beginPath();
    ctx.moveTo(pRelation.vertex1.x, pRelation.vertex1.y);
    ctx.lineTo(pRelation.vertex2.x, pRelation.vertex2.y);
    ctx.stroke();
}
function drawData(pData) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pData.relations.forEach(r => drawLineFromRelation(r));
    pData.verticies.forEach(v => drawCircleAroundPoint(v, 25));

}

function square(x) {
    return Math.pow(x, 2);
}
function checkIfClicked(vertex, radius, cursorX, cursorY) {
    return square(vertex.x - cursorX) + square(vertex.y - cursorY) < square(radius);
}

let callBack;
let rel = [];
document.getElementById("canvas").addEventListener("click", e2 => callBack(e2));
document.getElementById("val").onmousemove = () => document.getElementById("val_out").innerText = parseInt(document.getElementById("val").value);

document.getElementById("form").addEventListener("click", e1 => {
    if (data.isWinnable()) document.getElementById("winnable").innerHTML = "100% Winnable";
    else document.getElementById("winnable").innerHTML = "Maybe Winnable";
    {
        if (e1.target.id === "vertexmode") {
            callBack = e2 => {
                let x = e2.layerX,
                    y = e2.layerY,
                    val = parseFloat(document.getElementById("val").value);
                data.addVertex(x, y, val);
                drawData(data);
            }
            return;
        }

        else if (e1.target.id === "relationmode") {
            callBack = e2 => {
                let clickedVertex = data.verticies.find(vertex => checkIfClicked(vertex, 25, e2.layerX, e2.layerY));
                if (typeof clickedVertex !== "object") return;
                if (rel.length <= 1) {
                    if (rel.length === 0) rel[0] = clickedVertex;
                    else {
                        rel[1] = clickedVertex;
                        data.addRelation(rel[0], rel[1]);
                        rel = [];
                        drawData(data);
                    }
                }
            }
            return;
        }
        else if (e1.target.id === "startgame") {
            callBack = e2 => {
                let clickedVertex = data.verticies.find(vertex => checkIfClicked(vertex, 25, e2.layerX, e2.layerY));
                if (clickedVertex) data.distributeDollar(clickedVertex);
            }
            return;
        }
    }
});

