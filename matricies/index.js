import Vector from "./Vector";
import Matrix from "./Matrix";
import Line from "./Line";
import Point from "./Point";
import Plane from "./Plane";
import Triangle from "./triangle";


let vector1 = new Vector([1, 4]);
let vector2 = new Vector([2, 3]);




let A = new Matrix([vector1, vector2]);

A.initValues();


console.log(A.getEigenValues());