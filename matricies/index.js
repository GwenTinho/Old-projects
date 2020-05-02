import Vector from "./Vector";
import Matrix from "./Matrix";
import Line from "./Line";
import Point from "./Point";
import Plane from "./Plane";
import Triangle from "./triangle";


let vector1 = new Vector([1, 4, 0, 0]);
let vector2 = new Vector([1, 0, 0, 0]);
let vector3 = new Vector([0, 0, -3, 0]);
let vector4 = new Vector([0, 0, 1, -3]);



let A = new Matrix([vector1, vector2, vector3, vector4]);

A.initValues();

console.log(A.det);