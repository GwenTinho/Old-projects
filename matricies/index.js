import Vector from "./Vector";
import Matrix from "./Matrix";
import Line from "./Line";
import Point from "./Point";
import Plane from "./Plane";
import Triangle from "./triangle";


let vector1 = new Vector([5, 2]);
let vector2 = new Vector([-3, 1]);
let vector3 = new Vector([-4, 7]);
let vector4 = new Vector([8, 5]);


let A = new Matrix([vector1, vector2]);
let B = new Matrix([vector3, vector4]);

console.log(Matrix.getIdentityMatrix(5).multByReal(3).pow(3).toString());