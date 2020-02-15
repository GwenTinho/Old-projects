let ctx = canvas.getContext('2d');
ctx.canvas.width = 1900;
ctx.canvas.height = 900;
ctx.font = "20px Georgia";
ctx.fillStyle = "black";
const twoTimesPi = 2 * Math.PI;
let a;

window.onload = () => {
    a = randomArray(100000);
    drawArrayAsDots(a);
    drawSort(a, quicksort);
}

function drawCircle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, twoTimesPi);
    ctx.stroke();
}

function drawArrayAsDots(array) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    array.forEach((point, i) => {
        drawCircle(i * ctx.canvas.width / array.length - 5, point * 1000, 2);
    });
}

function videothing(n) { //generates e in a very obscure way
    let avg = 0;
    for (let i = 0; i < n; i++) {
        let check = 0;
        let counter = 0;
        while (check < 1) {
            check += Math.random();
            counter++;
        }
        avg += counter;
    }
    return avg / n;
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

function drawSort(array, fn) {
    drawArrayAsDots(array);

    setTimeout(() => {
        fn(array);
    }, 500);
}

function selectionSort(array) {
    let orderCount = 0;
    //while (orderCount < array.length) {
    setInterval(() => {
        if (orderCount >= array.length) return;
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
        drawArrayAsDots(array);
        orderCount += 1;
    }, 1000);

    //}

    return array;
}

function binarySearch(targetValue, array) {
    let m;
    let l = 0;
    let r = array.length - 1;
    while (l <= r) {
        m = (l + r) >> 1;
        if (array[m] < targetValue) {
            l = m + 1;
        } else if (array[m] > targetValue) {
            r = m - 1;
        } else {
            return m;
        }
    }
    return -1;
}

function partition(array, start, end) {
    let pivot = array[end];
    let pIndex = start;
    for (let i = start; i < end; i++) {
        if (array[i] <= pivot) {
            let temp = array[i];
            array[i] = array[pIndex];
            array[pIndex] = temp;
            pIndex++;
        }
    }
    let temp = array[end];
    array[end] = array[pIndex];
    array[pIndex] = temp;
    return pIndex;
}

function quickSortALG(array, start, end) {
    if (start < end) {
        setTimeout(() => {
            drawArrayAsDots(array);
            pIndex = partition(array, start, end);
            quickSortALG(array, start, pIndex - 1);
            quickSortALG(array, pIndex + 1, end);
            return array;
        }, 1000);
    }
}

function quicksort(array) {
    return quickSortALG(array, 0, array.length - 1);
}