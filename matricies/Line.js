import Point from "./Point";
import Vector from "./Vector";
import Matrix from "./Matrix";

class Line {
    constructor(point, vector) {
        this.point = point;
        this.vector = vector;
    }

    isOnLine(point) {
        if (this.vector.getDimension() !== this.point.getDimension()) return false;

        let cmpArray = [];

        for (let i = 0; i < this.vector.getDimension(); i++) {
            let t = (point.coordinates[i] - this.point.coordinates[i]) / this.vector.coordinates[i];
            cmpArray.push(t);
        }

        return cmpArray.every(t => t === cmpArray[0]);
    }

    getPointAtT(t) {
        let coords = [];

        for (let i = 0; i < this.vector.getDimension(); i++) {
            let pos = t * this.vector.coordinates[i] + this.point.coordinates[i];
            coords.push(pos);
        }

        return new Point(coords);
    }

    isParallel(line) {
        return Vector.checkAligned(this.vector, line.vector);
    }

    isCoplanar(line) {
        let v1 = this.vector;
        let v2 = line.vector;
        let v3 = Vector.fromPoints(this.point, line.point);

        let m = new Matrix([v1, v2, v3]);

        return m.det() === 0;
    }

    static fromPoints(p1, p2) {
        return new Line(p1, Vector.fromPoints(p1, p2));
    }



}

export default Line;