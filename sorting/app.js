let ctx = canvas.getContext('2d');
ctx.canvas.width = 1900;
ctx.canvas.height = 900;
ctx.font = "20px Georgia";
ctx.fillStyle = "black";


window.onload = () => {
    let array = randomIntArray(4, 10); //randomIntArray(10, 10);
    drawArray(array, 200, 200, 100);
    setTimeout(() => {
        array = selectionSort(array);
        drawArray(array, 200, 200, 100);
    }, 4000);

}



function drawSquareAroundPoint(x, y, l) {
    ctx.rect(x - l / 2, y + l / 2, l, l);
}

function drawText(text, x, y) {
    ctx.fillStyle = "white";
    ctx.fillText(text, x, y); // + l / 2
    //ctx.fill();
    ctx.fillStyle = "black";
}

function drawArray(arr, x, y, l) {
    for (let i = 0; i < arr.length; i++) {
        ctx.fillStyle = `rgb(${i * 16}, 0, 0)`;
        ctx.beginPath();
        drawSquareAroundPoint(x + i * (l + 100), y, l);
        ctx.closePath();
        ctx.fill();
        drawText(arr[i], x + i * (l + 100), y + 100);
    }
}

function randomArray(n) {
    const arr = new Array(n);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.random();
    }
    return arr;
}

function randomIntArray(n, max) {
    return randomArray(n).map(e => Math.floor(e * max));
}

function selectionSort(array) {
    let orderCount = 0;
    while (orderCount < array.length) {

        let smVal = array[orderCount];
        let index = orderCount;
        for (let j = orderCount; j < array.length; j++) {
            if (smVal > array[j]) {
                index = j;
                smVal = array[j];
            }
        }
        temp = array[orderCount];
        array[orderCount] = smVal;
        array[index] = temp;

        orderCount += 1;
    }

    return array;
}