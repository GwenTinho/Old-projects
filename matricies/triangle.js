import Vector from "./Vector";
import Point from "./Point";
import Matrix from "./Matrix";
import Line from "./Line";
import Plane from "./Plane";

// triangle in 3d

class Triangle extends Plane {
    constructor(A, B, C) { // points A,B,C defining triangle (ABC)

        this.A = A;
        this.B = B;
        this.C = C;

        // we also define all the variables for planar functions
        super(Vector.fromPoints(A, B), Vector.fromPoints(A, C), A);
    }

    isPointInTriangle(point) {

        if (!this.isValidPlane) return false;

        // implementation of this code https://blackpawn.com/texts/pointinpoly/default.html
        /*
        it is never explained why p1 and p2 are needed for his function though 
        it is somewhat obvious that we compare 2 points to our line ab to check whether is it towards the third point or away from it
        as the third point is what we compare our point to. The dot product isnt really used for anything except for checking the direction of the vectors 
        that we get from the cross products, as a negative dot product implies different directions
        */

        function sameSide(p1, p2, a, b) {
            let AB = Vector.fromPoints(a, b);
            let Ap1 = Vector.fromPoints(a, p1);
            let Ap2 = Vector.fromPoints(a, p2);

            let cross1 = AB.cross(Ap1);
            let cross2 = AB.cross(Ap2);

            return cross1.dot(cross2) >= 0;
        }

        return sameSide(point, this.A, this.B, this.C) &&
            sameSide(point, this.B, this.A, this.C) &&
            sameSide(point, this.C, this.A, this.B);
    }

    getArea() {
        if (!this.isValidPlane) return NaN;

        return this.vector1.cross(this.vector2).getNorm() / 2;
    }

    isRightInA() {
        if (!this.isValidPlane) return false;

        return this.vector1.dot(this.vector2) == 0;
    }

    getAngles() { // definition from https://en.wikipedia.org/wiki/Triangle using thm d' Al Kashi
        const a = Vector.fromPoints(B, C).getNorm();
        const b = this.vector2.getNorm();
        const c = this.vector1.getNorm();
        const aSqr = a * a;
        const bSqr = b * b;
        const cSqr = c * c;

        // alpha, beta, gamma are the angles originating from their corresponing point (alpha, A), (beta,B), (gamma,C)

        const alpha = Math.acos((bSqr + cSqr - aSqr) / (2 * b * c));
        const beta = Math.acos((aSqr + cSqr - bSqr) / (2 * a * c));
        const gamma = Math.acos((aSqr + bSqr - cSqr) / (2 * a * b));

        return {
            alpha,
            beta,
            gamma
        }
    }

}

export default Triangle;