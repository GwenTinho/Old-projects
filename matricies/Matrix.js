import Vector from "./Vector";

class Matrix {
    constructor(vectors) {
        this.vectors = vectors; // matrix as array of column vectors

        this.det;
        this.inverse;
        this.rref;
        this.isOrthogonal;
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

    initValues() {

        const dims = this.getDimensions();
        const rows = dims[0];
        const columns = dims[1];

        let rref = this.copyInstance();
        let iden = Matrix.getIdentityMatrix(rows);

        let factors = 1;
        let lead = 0;

        for (let r = 0; r < rows; r++) {
            if (columns <= lead) {
                this.rref = Matrix.getEmptyMatrix();
                this.det = 0;
                this.inverse = Matrix.getEmptyMatrix();
                return;
            }
            let i = r;
            while (rref.get(i, lead) === 0) {
                i++;
                if (rows == i) {
                    i = r;
                    lead++;
                    if (columns == lead) {
                        this.rref = Matrix.getEmptyMatrix();
                        this.det = 0;
                        this.inverse = Matrix.getEmptyMatrix();
                        return;
                    }
                }
            }

            rref = rref.swapRow(i, r);
            iden = iden.swapRow(i, r);

            let val = rref.get(r, lead);

            rref = rref.multiplyRow(r, 1 / val);
            iden = iden.multiplyRow(r, 1 / val);

            factors *= -val;

            for (let i = 0; i < rows; i++) {
                if (i == r) continue;
                val = rref.get(i, lead);

                rref = rref.addMultRow(i, r, -val);
                iden = iden.addMultRow(i, r, -val);
            }
            lead++;
        }

        let accumulator = factors;

        for (let i = 0; i < columns; i++) {
            accumulator *= rref.get(i, i);
        }

        this.rref = rref;
        this.det = accumulator;
        this.inverse = (this.det == 0) ? Matrix.getEmptyMatrix() : iden;
        this.isOrthogonal = this.isEqual(this.inverse);
    }

    get(row, column) {
        return this.vectors[column].coordinates[row];
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

    swapCol(idx1, idx2) {
        const matrix = this.copyInstance();
        if (idx1 === idx2) return matrix;
        const oldcol = matrix.vectors[idx1];
        matrix.vectors[idx1] = matrix.vectors[idx2];
        matrix.vectors[idx2] = oldcol;

        return matrix;
    }

    swapRow(idx1, idx2) {
        if (idx1 === idx2) return this.copyInstance();
        return this.T().swapCol(idx1, idx2).T();
    }

    multiplyRow(idx, scalar) {
        const matrix = this.copyInstance();

        for (let i = 0; i < matrix.vectors.length; i++) {
            matrix.vectors[i].coordinates[idx] *= scalar;
        }

        return matrix;
    }

    addRow(oldRow, rowToBeAdded) {
        const matrix = this.copyInstance();

        for (let i = 0; i < matrix.vectors.length; i++) {
            matrix.vectors[i].coordinates[oldRow] += matrix.vectors[i].coordinates[rowToBeAdded];
        }

        return matrix;
    }

    addMultRow(oldRow, rowToBeAdded, scalar) {
        const matrix = this.copyInstance();

        for (let i = 0; i < matrix.vectors.length; i++) {
            matrix.vectors[i].coordinates[oldRow] += matrix.vectors[i].coordinates[rowToBeAdded] * scalar;
        }

        return matrix;
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

    static getEmptyMatrix() {
        return new Matrix([]);
    }
}

export default Matrix;