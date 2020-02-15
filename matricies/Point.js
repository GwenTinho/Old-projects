class Point {
    constructor(coordinates) {
        this.coordinates = coordinates;
    }

    getDimension() {
        return this.coordinates.length;
    }
}

export default Point;