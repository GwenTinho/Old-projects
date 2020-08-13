import Vector from "./Vector";
import Matrix from "../Matrix";

class MFunction {
    constructor(inputDimensions) { // parametric as in R -> R^n
        this.isOutputSet = false;
        this.inputDimensions = inputDimensions;
        this.outputDimensions;
        this.isParamFn = inputDimensions === 1;
        this.input = inputVectorOrScalar;
        this.calc;
        this.getTotalDerivativeAt;
        this.getGradientAt;
        if (!this.isValid) console.log("invalid structure");
    }

    setOutput(functionArray) {
        this.outputDimensions = functionArray.length;
        if (this.outputDimensions === 1) {
            this.calc = t => { // t can be a vector or scalar
                this.isOutputSet = true;
                return functionArray[0](t);
            }
            return this;
        }
        this.calc = t => {
            this.isOutputSet = true;
            return new Vector(functionArray.map(fn => fn(t)));
        }
        return this;
    }

    partialDerivative(index) { // R^n -> R^m
        if (!this.isOutputSet || this.isParamFn) return new Error("invalid structure");
        return t => { // t is a vector
            const h = 1e-10;
            return this.calc(t.addToRow(index, h)).sub(this.calc(t)).mult(1 / h);
        }
    }

    calcTotalDerivative() {
        if (!this.isOutputSet) {
            console.log(new Error("invalid structure"));
        } {
            if (this.isParamFn) {
                this.getTotalDerivativeAt = this.paramDeriv;
            } else {
                this.getTotalDerivativeAt = t => {
                    let vectors = [];
                    for (let index = 0; index < this.inputDimensions; index++) {
                        vectors.push(this.partialDerivative(index)(t));
                    }
                    return new Matrix(vectors);
                }
            }
            if (this.outputDimensions === 1) this.getGradientAt = t => this.getTotalDerivativeAt().T().getCol(0);
        }
    }

    directionalDerivative(v, x) { // x along v
        return this.getGradientAt(x).dot(v);
    }

    getCurvatureAt(t) {
        if (this.isParamFn && this.isOutputSet) return new Error("invalid structure");

        const dS = MFunction.paramDeriv(t, this.calc); // 1st deriv

        const ddS = MFunction.paramDeriv(t, x => paramDeriv(x, this.calc)); // 2nd deriv

        const ddSNormSquared = ddS.getNormSquared();
        const dSNormSquared = dS.getNormSquared();
        const dSNorm = ds.getNorm();

        const dotProdSquared = ddS.dot(dS) ** 2;

        return Math.sqrt(ddSNormSquared * dSNormSquared - dotProdSquared) / (dSNorm ** 3);
    }

    getUnitTangent(t) {
        if (!this.isParamFn || !this.isOutputSet) return new Error("invalid structure");

        return MFunction.paramDeriv(t, this.calc).asUnit();
    }

    getPrincipleUnitNormal(t) {
        if (!this.isParamFn || !this.isOutputSet) return new Error("invalid structure");

        return MFunction.paramDeriv(t, this.getUnitTangent).asUnit();
    }

    getDivergence(t) {
        if (!this.isOutputSet) return new Error("invalid structure");

        return this.getTotalDerivativeAt(t).trace();
    }

    static paramDeriv(t, paramFn) { // R -> R^n
        // t is a scalar
        const h = 1e-10;
        const v1 = paramFn(t);
        const v2 = paramFn(t + h);
        v2.sub(v1).mult(1 / h);
        return v2;
    }
}

export default MFunction;