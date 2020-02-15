class Vector {
    constructor(coordinates) {
        this.coordinates = coordinates;
    }

    dot(vector) {
        if (vector.getDimension() !== this.getDimension()) return NaN;

        let sum = 0;
        for (let i = 0; i < this.getDimension(); i++) {
            sum += this.coordinates[i] * vector.coordinates[i]
        }
        return sum;
    }

    cross(vector) {
        if (vector.getDimension() !== 3 || this.getDimension() !== 3) return NaN;

        return new this([
            this.coordinates[1] * vector.coordinates[2] - this.coordinates[2] * vector.coordinates[1],
            this.coordinates[2] * vector.coordinates[0] - this.coordinates[0] * vector.coordinates[2],
            this.coordinates[0] * vector.coordinates[1] - this.coordinates[1] * vector.coordinates[0],
        ]);
    }

    getDimension() {
        return this.coordinates.length;
    }

    getNormSquared() {
        let sum = 0;
        for (let i = 0; i < this.getDimension(); i++) {
            sum += this.coordinates[i] * this.coordinates[i];
        }
        return sum;
    }

    getNorm() {
        return Math.sqrt(this.getNormSquared());
    }

    mult(number) {
        this.coordinates = this.coordinates.map(coord => coord * number);
        return this;
    }

    add(vector) {
        if (vector.getDimension() !== this.getDimension()) return NaN;

        for (let i = 0; i < this.getDimension(); i++) {
            this.coordinates[i] += vector.coordinates[i];
        }
        return this;
    }

    static findAngle(v1, v2) {
        v1.dot(v2) / (v1.getNorm() * v2.getNorm());
    }

    static checkAligned(v1, v2) {
        return v1.dot(v2) === v1.getNormSquared() * v2.getNormSquared();
    }

    static fromPoints(p1, p2) {
        if (p1.getDimension() !== p2.getDimension()) return NaN;

        return new Vector(p1.coordinates.map((coord, i) => p2.coordinates[i] - coord));
    }
}

export default Vector;