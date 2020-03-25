import Vector from "./Vector";
import Matrix from "./Matrix";
import Line from "./Line";
import Point from "./Point";
import Plane from "./Plane";
import Triangle from "./triangle";


let point1 = new Point([0, 0, 0]);
let point2 = new Point([0, 1, 0]);
let point3 = new Point([2, 0, 0]);

let point4 = new Point([1, 0, 0]);

let T = new Triangle(point1, point2, point3);

console.log(T.getAngles(), T.isPointInTriangle(point4));