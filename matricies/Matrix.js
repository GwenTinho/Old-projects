import Vector from "./Vector";

class Matrix {
    constructor(vectors) {
        this.vectors = vectors; // matrix as array of column vectors
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

    get(row, colum) {
        return this.vectors[colum].coordinates[row];
    }

    getDimensions() { // row colomn
        return [this.vectors[0].getDimension(), this.vectors.length];
    }

    isSameDimensions(matrix) {
        const dim1 = this.getDimensions();
        const dim2 = matrix.getDimensions();

        return dim1[0] === dim2[0] && dim1[1] === dim2[1];
    }

    isSquare() {
        const dim = this.getDimensions();

        return dim[0] === dim[1];
    }

    isEqual(matrix) {
        if (!this.isSameDimensions(matrix)) return false;

        for (let i = 0; i < this.vectors.length; i++) {
            if (!this.vectors[i].isEqual(matrix.vectors[i])) return false;
        }

        return true;
    }

    T() {
        let rowVectors = [];

        for (let i = 0; i < this.vectors[0].getDimension(); i++) { // rows
            let coords = [];

            for (let j = 0; j < this.vectors.length; j++) { // columns
                coords.push(this.get(i, j));
            }
            rowVectors.push(new Vector(coords));
        }

        return new Matrix(rowVectors);
    }

    add(matrix) {
        this.vectors.map((vector, i) => vector.add(matrix.vectors[i]));
    }

    mul(matrix) {

        if (this.getDimensions()[1] !== matrix.getDimensions[0]) return null; // check if they can be multiplied

        let transpose = this.T();

        let colVectors = [];

        for (let i = 0; i < this.vectors.length; i++) {
            colVectors.push(transpose.multByVector(matrix.vectors[i]));
        }

        return new Matrix(colVectors);
    }

    copyInstance() {
        return new Matrix(this.vectors);
    }

    pow(n) {
        let accumulator = this.copyInstance();
        let multiplicator = this.copyInstance();
        if (this.isSquare()) {
            for (let i = 0; i < n - 1; i++) {
                accumulator = accumulator.mul(multiplicator);
            }
        }

        return accumulator;
    }

    toString() {
        let word = "";

        for (let i = 0; i < this.vectors[0].getDimension(); i++) {
            word += "[ ";
            for (let j = 0; j < this.vectors.length; j++) {
                word = word + ((j !== 0) ? ", " : "") + this.get(i, j);

            }
            word += " ]\n";
        }

        return word;
    }

    static getIdentityMatrix(n) {

        let columnVectors = new Array(n);

        for (let i = 0; i < n; i++) {
            let columnVector = new Array(n);

            for (let j = 0; j < n; j++) {
                if (i === j) columnVector[j] = 1;
                else columnVector[j] = 0;
            }
            columnVectors[i] = new Vector(columnVector);
        }

        return new Matrix(columnVectors);
    }

    static fastDet2d(arr1, arr2) {
        return arr1[0] * arr2[1] - arr1[1] * arr2[0];
    }
}

export default Matrix;