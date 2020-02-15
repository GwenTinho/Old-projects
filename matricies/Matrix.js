import Vector from "./Vector";

class Matrix {
    constructor(vectors) {
        this.vectors = vectors;
    }

    multByVector(vector) {
        let coords = [];

        for (let i = 0; i < this.vectors.length; i++) {
            coords.push(this.vectors[i].dot(vector));
        }

        return new Vector(coords);
    }

    multByReal(number) {
        this.vectors.map(vector => vector.mult(number));
        return this;
    }

    det() {
        if (this.vectors.length !== this.vectors[0].coordinates.length) return NaN;
        if (this.vectors.length === 2) return this.vectors[0].coordinates[0] * this.vectors[1].coordinates[1] - this.vectors[1].coordinates[0] * this.vectors[0].coordinates[1];
        if (this.vectors.length === 3) {
            return 0 +
                this.vectors[0].coordinates[0] * this.vectors[1].coordinates[1] * this.vectors[2].coordinates[2] +
                this.vectors[1].coordinates[0] * this.vectors[2].coordinates[1] * this.vectors[0].coordinates[2] +
                this.vectors[2].coordinates[0] * this.vectors[0].coordinates[1] * this.vectors[1].coordinates[2] -
                this.vectors[0].coordinates[2] * this.vectors[1].coordinates[1] * this.vectors[2].coordinates[0] -
                this.vectors[1].coordinates[2] * this.vectors[2].coordinates[1] * this.vectors[0].coordinates[0] -
                this.vectors[2].coordinates[2] * this.vectors[0].coordinates[1] * this.vectors[1].coordinates[0]
        } else {
            console.log("TODO");
        }
    }

    static fastDet2d(arr1, arr2) {
        return arr1[0] * arr2[1] - arr1[1] * arr2[0];
    }
}

export default Matrix;