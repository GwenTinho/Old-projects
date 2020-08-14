import Vector from "../Vector";
import Matrix from "../Matrix";

class MFunction {
    constructor(inputDimensions) { // parametric as in R -> R^n
        this.isOutputSet = false;
        this.inputDimensions = inputDimensions;
        this.outputDimensions;
        this.isParamFn = inputDimensions === 1;
        this.calc;
        this.getTotalDerivativeAt;
        this.getGradientAt;
    }

    setOutput(functionArray) {
        this.outputDimensions = functionArray.length;
        if (this.outputDimensions === 1) {
            this.calc = t => { // t can be a vector or scalar
                return functionArray[0](t);
            }
            return this;
        }
        this.calc = t => {
            return new Vector(functionArray.map(fn => fn(t)));
        }
        this.isOutputSet = true;
        return this;
    }

    partialDerivative(index) { // R^n -> R^m
        if (!this.isOutputSet || this.isParamFn) return new Error("invalid structure for partial deriv");
        return t => { // t is a vector
            const h = 1e-10;
            let s = t.copyInstance();
            return this.calc(t.addToRow(index, h)).sub(this.calc(s.addToRow(index, -h))).mult(0.5 / h);
        }
    }

    calcTotalDerivative() {
        if (!this.isOutputSet) {
            console.log(new Error("invalid structure for total deriv"));
        } {
            if (this.isParamFn) {
                this.getTotalDerivativeAt = t => MFunction.paramDeriv(t, this.calc);
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
        if (!this.isParamFn || !this.isOutputSet) return new Error("invalid structure for curvature");

        const dS = MFunction.paramDeriv(t, this.calc); // 1st deriv

        const ddS = MFunction.secondParaDeriv(t, this.calc); // 2nd deriv

        const ddSNormSquared = ddS.getNormSquared();
        const dSNormSquared = dS.getNormSquared();
        const dSNorm = dS.getNorm();

        const dotProdSquared = ddS.dot(dS) ** 2;

        return Math.sqrt(ddSNormSquared * dSNormSquared - dotProdSquared) / (dSNorm ** 3);
    }

    getUnitTangent(t) {
        if (!this.isParamFn || !this.isOutputSet) return new Error("invalid structure for unit tan");

        return MFunction.paramDeriv(t, this.calc).asUnit();
    }

    getPrincipleUnitNormal(t) {
        if (!this.isParamFn || !this.isOutputSet) return new Error("invalid structure for unit norm");

        return MFunction.paramDeriv(t, this.getUnitTangent).asUnit();
    }

    getDivergence(t) {
        if (!this.isOutputSet) return new Error("invalid structure for divergence");

        return this.getTotalDerivativeAt(t).trace();
    }

    static paramDeriv(t, paramFn) { // R -> R^n // dont use repeated
        // t is a scalar
        const h = 1e-10;
        const v1 = paramFn(t - h);
        const v2 = paramFn(t + h);

        v2.sub(v1).mult(0.5 / h);
        return v2;
    }

    static secondParaDeriv(t, paramFn) {
        // t is a scalar
        const h = 1e-6;
        const v1 = paramFn(t + 2 * h);
        const v2 = paramFn(t + h).mult(2);
        const v3 = paramFn(t);

        v1.sub(v2).add(v3).mult(1 / (h * h));
        return v1;
    }
}

export default MFunction;