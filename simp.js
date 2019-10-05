// async function catchData (data) {

// }

// async function simpMethod(data, h) {
//     let res = Fi[0] + Fi[2 * n];
//     let dataEven = new Array();
//     let dataOdd = new Array();
//     let k = 0;
//     let d = 0;
//     for (let i = 1; i < 2 * n; i++) {
//         if (i % 2 * n - 1 === 0) {
//             dataOdd[k] = data[i];
//             k++
//         } else {
//             dataEven[d] = data[i];
//             d++;
//         }
//     }
//     let request1 = dataOdd.map(data => res += 4 * data)
//     let promise1 = await Promise.all(request1);
//     let request2 = dataEven.map(data => res += 2 * data)
//     let promise2 = await Promise.all(request2);
//     if (promise1 && promise2) {
//         res *= h / 3;
//         let span = document.createElement('span');
//         span.innerHTML = 'result: ' + res;
//         body.appendChild(span);
//     }
// }

async function simpMethod() {
    let res = cube(A, B, C, D, a);
    res += cube(A, B, C, D, b);
    // console.log(res, '____');
    let dataOdd = new Array();
    let dataEven = new Array();
    let copyOdd = new Array();
    let copyEven = new Array();
    for (let i = 1; i < 2 * n; i += 2) {
        dataOdd[i] = a + i * (b - a) / (2 * n);
        // console.log(dataOdd[i]);
    }
    for (let i = 2; i < 2 * n; i += 2) {
        dataEven[i] = a + i * (b - a) / (2 * n);
        // console.log(dataEven[i]);
    }
    let request1 = dataOdd.map(data => {
        copyOdd.push(4 * cube(A, B, C, D, data));
        console.log(cube(A, B, C, D, data));
    });
    let request2 = dataEven.map(data => {
        copyEven.push(2 * cube(A, B, C, D, data));
        console.log(cube(A, B, C, D, data));
    });
    let promise1 = await Promise.all(request1);
    let promise2 = await Promise.all(request2);
    if (promise1 && promise2) {
        copyOdd.forEach((el) => {
            res += el;
        });
        copyEven.forEach((el) => {
            res += el;
        });
        res *= (b - a) / (3 * (2 * n));
        let span = document.createElement('span');
        span.innerHTML = 'result: ' + res;
        body.appendChild(span);
    }
}

function cube(A, B, C, D, x) {
    return A * x * x * x + B * x * x + C * x + D;
}

function change(element, i) {
    if (element.value) Fi[i] = element.value;
    else Fi[i] = 0;
}

// function countSimp(e) {
//     e.preventDefault;
//     let h = (b - a) / (2 * n);
//     simpMethod(Fi[i], h);
// }
var a;
var b;
var n;
var A;
var B;
var C;
var D;
let submit = document.querySelector('.submit');
let body = document.querySelector('.innerBody');
var Fi = new Array();
submit.onclick = e => {
        e.preventDefault();
        a = document.querySelector('.simpA').value;
        b = document.querySelector('.simpB').value;
        n = document.querySelector('.simpN').value;
        A = document.querySelector('.coefA').value;
        B = document.querySelector('.coefB').value;
        C = document.querySelector('.coefC').value;
        D = document.querySelector('.coefD').value;
        a = Number(a);
        b = Number(b);
        A = Number(A);
        B = Number(B);
        C = Number(C);
        D = Number(D);
        n = Number.parseInt(n);
        if (isNaN(a) || isNaN(b) || a > b || isNaN(n) || n > 100 || n < 2 || isNaN(A) || isNaN(B) || isNaN(C) || isNaN(D)) {
            return alert('data is incorrect');
        }
        // var Fi = new Array(2 * n + 1);
        // Fi[0] = cube(A, B, C, D, a);
        // Fi[2 * n] = cube(A, B, C, D, b);
        simpMethod();
    }
    // submit.onclick = (e) => {
    //     e.preventDefault();
    //     a = document.querySelector('.simpA').value;
    //     b = document.querySelector('.simpB').value;
    //     n = document.querySelector('.simpN').value;
    //     a = Number(a);
    //     b = Number(b);
    //     n = Number.parseInt(n);
    //     if (isNaN(a) || isNaN(b) || isNaN(n) || n > 50 || n < 2) {
    //         return alert('data is incorrect');
    //     }
    //     Fi[0] = a;
    //     Fi[2 * n] = b;
    //     for (let i = 1; i < 2 * n; i++) {
    //         Fi[i] = 0;
    //         let element = document.createElement('input');
    //         element.setAttribute('placeHolder', 'enter f(x' + i + ')');
    //         element.onchange = change(element, i);
    //         body.appendChild(element);
    //     }
    //     let count = document.createElement('input');
    //     count.setAttribute('type', 'submit');
    //     count.value = 'count';
    //     body.appendChild(count);
    //     count.onclick = e => {
    //         e.preventDefault;
    //         let h = (b - a) / (2 * n);
    //         simpMethod(Fi, h);
    //     };
    // }