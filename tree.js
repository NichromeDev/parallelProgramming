var n;
let create = document.querySelector('.create');
let find = document.querySelector('.find');
let body = document.querySelector('.innerBody');
var check = false;
var V = new Array();
var TREE = new Array();
var firstTree = new Array();

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkCycle(tree, edge) {
    let check1 = false;
    let check2 = false;
    tree.forEach(el => {
        if (edge.v === el.v || edge.v === el.to) check1 = true;
    });
    tree.forEach(el => {
        if (edge.to === el.v || edge.to === el.to) check2 = true;
    });
    if (!check1 || !check2) {
        return false;
    }
    return true;
}

function treeCheck(tree, edge) {
    tree.forEach(el => {
        if (el.v !== edge.v) return !checkCycle(tree, edge);
        if (el.v === edge.to) return !checkCycle(tree, edge);
        if (el.to === edge.v) return !checkCycle(tree, edge);
        if (el.to === edge.to) return !checkCycle(tree, edge);
    });
    return false;
}

function combineTrees(tree1, tree2) {
    let tree = tree1;
    tree2.forEach(el => {
        tree.push(el);
    });
    return tree;
}

async function findSecondTree() {
    let copy = new Array();
    let weight = new Array();
    let secondTree = new Array();
    let k = 0;
    let request = firstTree.map((el, i) => {
        let checkBool = true;
        for (let j = 0; j < n - 1; j++) {
            if (i !== j) {
                if (firstTree[j].v == i || firstTree[j].to == i || V[i].length < 2) {
                    checkBool = false;
                    break;
                }
            }
        }
        console.log(checkBool);
        if (checkBool) {
            weight[k] = 100;
            for (let j = 0; j < V[i].length; j++) {
                if (firstTree[j].v !== V[i][j].v && firstTree[j].to !== V[i][j].to) {
                    if (V[i][j].w < weight[k]) {
                        copy[k] = V[i][j];
                        weight[k] = V[i][j].w;
                    }
                }
            }
            console.log(copy[i]);
        }
        k++;
    });
    let promise = await Promise.all(request);
    if (promise) {
        let k = 101;
        for (let i = 0; i < firstTree.length; i++) {
            secondTree[i] = firstTree[i];
        }
        for (let i = 1; i < n; i++) {
            if (weight[i] && weight[i] < k) {
                k = weight[i];
                secondTree[i] = copy[i];
            }
        }
        let element = document.createElement('span');
        element.innerHTML = 'second spanning tree:';
        body.appendChild(element);
        secondTree.forEach(el => {
            let element = document.createElement('span');
            element.innerHTML = '{v: ' + el.v + ', weight: ' + el.w + ', to: ' + el.to + '}';
            body.appendChild(element);
        });
    }
}
create.onclick = e => {
    e.preventDefault;
    body.innerHTML = '';
    V = [];
    n = document.querySelector('.treeN').value;
    n = Number.parseInt(n);
    if (isNaN(n) || n < 3 || n > 20) {
        return alert('data is incorrect');
    }
    for (let i = 0; i < n; i++) {
        // V[i] = new Array();
        for (let j = i + 1; j < n; j++) {
            if (j === i + 1) {
                V.push({ v: i, w: getRandomIntInclusive(1, 100), to: j });
                continue;
            }
            if (Math.round(Math.random() * 4 / 5)) {
                V.push({ v: i, w: getRandomIntInclusive(1, 100), to: j });
            }
        }
    }
    V.forEach(el => {
        let element = document.createElement('span');
        element.innerHTML = '{v: ' + el.v + ', weight: ' + el.w + ', to: ' + el.to + '}';
        body.appendChild(element);
    });
    check = true;
}

find.onclick = e => {
    e.preventDefault;
    if (!check) {
        return alert('you didnt create tree');
    }
    let element = document.createElement('span');
    element.innerHTML = 'first spanning tree:';
    body.appendChild(element);
    let sortV = new Array();
    for (let i = 0; i < V.length; i++) {
        sortV[i] = V[i];
    }
    for (let i = 0; i < sortV.length; i++) {
        for (let j = 0; j < sortV.length - i - 1; j++) {
            if (sortV[j].w > sortV[j + 1].w) {
                let z = sortV[j + 1];
                sortV[j + 1] = sortV[j];
                sortV[j] = z;
            }
        }
    }
    let treeID = new Array();
    treeID[0] = new Array();
    treeID[0].push(sortV[0]);
    let meter = 1;
    for (let i = 1; i < sortV.length; i++) {
        if (meter === n - 1) break;
        let join = 0;
        let currentJoin = new Array();
        let meterCheck = false;
        for (let j = 0; j < treeID.length; j++) {
            if (join === 2) {
                treeID[currentJoin[0]] = combineTrees(treeID[currentJoin[0]], treeID[currentJoin[1]]);
                treeID.splice(currentJoin[1], 1);
                console.log(1);
                break;
            }
            console.log(treeCheck(treeID[j], sortV[i]));
            if (treeCheck(treeID[j], sortV[i])) {
                if (join === 0) {
                    treeID[j].push(sortV[i]);
                    console.log(1);
                }
                currentJoin[join] = j;
                join++;
                meterCheck = true;
                continue;
            }
        }
        if (meterCheck) {
            meter++;
            // treeID[meter + 1] = new Array();
        } else {
            let length = treeID.length - 1;
            treeID[length + 1] = new Array();
            treeID[length + 1].push(sortV[i]);
            // console.log(treeID);
        }
    }
    for (let i = 0; i < treeID.length; i++) {
        if (treeID[i]) {
            firstTree = treeID[i];
            break;
        }
    }
    // let l = 1;
    // while (true) {
    //     if (l === 10) break;
    //     let k = 100;
    //     let currCheck = new Array();
    //     for (let i = 0; i < checkV.length; i++) {
    //         currCheck[i] = checkV[i];
    //     }
    // checkV.forEach(elem => {
    //     for (j = 0; j < V[elem].length; j++) {
    //         if (!checkV.every(el => el !== V[elem][j].to)) continue;
    //         if (V[elem][j].w > k) continue;
    //         k = V[elem][j].w;
    //         firstTree[l - 1] = { v: V[elem][j].v, w: V[elem][j].w, to: V[elem][j].to }
    //         currCheck[l] = V[elem][j].to;
    //     }
    // });
    //     for (let i = 0; i < V.length; i++) {
    //         for (let j = 0; j < V[i].length; j++) {
    //             // if (!checkV.every(el => el !== V[i][j].to)) continue;
    //             if (V[i][j].w > k) continue;
    //             if (checkV.every(el => el !== V[i][j].v)) {
    //                 if (!checkV.every(el => el !== V[i][j].to))
    //                     k = V[i][j].w;
    //                 firstTree[l - 1] = { v: V[i][j].v, w: V[i][j].w, to: V[i][j].to }
    //                 currCheck[l] = V[i][j].v;
    //             } else {
    //                 k = V[i][j].w;
    //                 firstTree[l - 1] = { v: V[i][j].v, w: V[i][j].w, to: V[i][j].to }
    //                 currCheck[l] = V[i][j].to;
    //             }
    //         }
    //     }
    //     for (let i = 0; i < currCheck.length; i++) {
    //         checkV[i] = currCheck[i];
    //     }
    //     l++;
    // }
    firstTree.forEach(el => {
        let element = document.createElement('span');
        element.innerHTML = '{v: ' + el.v + ', weight: ' + el.w + ', to: ' + el.to + '}';
        body.appendChild(element);
    });
    // findSecondTree();
}