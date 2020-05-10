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

    let newArr = [...array];

    for (let i = 0; i < newArr.length - 1; i++) {
        let min = i;

        for (let j = i + 1; j < newArr.length; j++) {
            if (newArr[j] < newArr[min]) min = j;
        }

        if (min !== i) {
            temp = newArr[min];
            newArr[min] = newArr[index];
            newArr[index] = temp;
        }
    }

    return newArr;
}

function fisherShuffle(array) {

    let newArr = [...array]; // making the function immutable

    for (let index = newArr.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * i);

        // now swap i and j essentially randomizing the array from right to left like an inverse selection sort

        if (randomIndex !== i) {
            temp = newArr[randomIndex];
            newArr[randomIndex] = newArr[index];
            newArr[index] = temp;
        }
    }

    return newArr;
}