var n;
let create = document.querySelector('.create');
let find = document.querySelector('.find');
let body = document.querySelector('.innerBody');
var check = false;
var V = new Array();
var TREE = new Array();
var firstTree = new Array();

function inc(x) {
    x++;
    return x;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
create.onclick = e => {
    e.preventDefault;
    n = document.querySelector('.treeN').value;
    n = Number.parseInt(n);
    if (isNaN(n) || n < 3 || n > 20) {
        return alert('data is incorrect');
    }
    for (let i = 0; i < n; i++) {
        V[i] = new Array();
        for (let j = i + 1; j < n; j++) {
            if (j === i + 1) {
                V[i].push({ v: i, w: getRandomIntInclusive(1, 100), to: j });
                continue;
            }
            if (Math.round(Math.random() * 4 / 5)) {
                V[i].push({ v: i, w: getRandomIntInclusive(1, 100), to: j });
            }
        }
    }
    for (let i = 0; i < V.length; i++) {
        V[i].forEach(el => {
            let element = document.createElement('span');
            element.innerHTML = '{v: ' + el.v + ', weight: ' + el.w + ', to: ' + el.to + '}';
            body.appendChild(element);
        });
    }
    check = true;
}

find.onclick = e => {
    e.preventDefault;
    if (!check) {
        return alert('you didnt create tree');
    }
    for (let i = 0; i < n; i++) {
        TREE[i] = new Array();
        TREE[i] = V[i];
    }
    checkV = new Array();
    checkV[0] = 0;
    let element = document.createElement('span');
    element.innerHTML = 'first spanning tree:';
    body.appendChild(element);
    for (let i = 0; i < TREE.length; i++) {
        let k = 100;
        for (let k = i + 1; k > 0; k--) {
            for (j = 0; j < TREE[i].length; j++) {
                if (checkV.every(el => el !== j)) continue;
                if (checkV.every(el => el === TREE[k][j].to)) continue;
                if (TREE[k][j].w > k) continue;
                k = TREE[k][j].w;
                firstTree[i] = { v: TREE[k][j].v, w: TREE[k][j].w, to: TREE[k][j].to }
                checkV[i + 1] = TREE[k][j].to;
            }
        }
    }
}