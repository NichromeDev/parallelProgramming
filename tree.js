var n;
let create = document.querySelector(".create");
let find = document.querySelector(".find");
let body = document.querySelector(".innerBody");
var check = false;
var V = new Array();
var TREE = new Array();
var firstTree = new Array();
var hasCycle = false;
var variable = [];
var integer = 0;

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
    if (edge.to === el.v || edge.to === el.to) check2 = true;
  });
  if (check1 && check2) {
    return false;
  }
  return true;
}

function treeCheck(tree, edge) {
  let check = false;
  tree.forEach(el => {
    if (
      el.v === edge.v ||
      el.v === edge.to ||
      el.to === edge.v ||
      el.to === edge.to
    ) {
      check = checkCycle(tree, edge);
      hasCycle = !check;
    }
  });
  return check;
}

function combineTrees(tree1, tree2) {
  console.log('before: ', tree1);
  console.log('insert: ', tree2);
  console.log('after: ', [...tree1, ...tree2]);
  return [...tree1, ...tree2];
}

function findFirstTree(V) {
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
  let firstTree = new Array();
  let treeID = new Array();
  treeID[0] = new Array();
  treeID[0][0] = sortV[0];
  console.log(sortV);
  let meter = 1;
  for (let i = 1; i < sortV.length; i++) {
    hasCycle = false;
    if (meter === n - 1) break;
    let join = 0;
    let currentJoin = new Array();
    let meterCheck = false;
    for (let j = 0; j < treeID.length; j++) {
      if (treeCheck(treeID[j], sortV[i])) {
        if (join === 0) {
          treeID[j].push(sortV[i]);
          let rtyu = new Array();
          treeID[j].forEach((el, index) => (rtyu[index] = el));
        }
        currentJoin[join] = j;
        join++;
        meterCheck = true;
      }
      if (hasCycle) {
        console.log('rejected:', sortV[i]);
        break;
      }
      if (join === 2) {
        treeID[currentJoin[0]] = combineTrees(
          treeID[currentJoin[0]],
          treeID[currentJoin[1]]
        );
        treeID.splice(currentJoin[1]);
        break;
      }
    }
    if (meterCheck) {
      meter++;
    } else if (!hasCycle) {
      let length = treeID.length;
      treeID[length] = new Array();
      treeID[length][0] = sortV[i];
      console.log('new push:', sortV[i]);
    }
  }
  for (let i = 0; i < treeID.length; i++) {
    if (treeID[i]) {
      firstTree = treeID[i];
      break;
    }
  }
  console.log(treeID);
  return firstTree;
}

async function findSecondTree() {
  //   let copy = new Array();
  let weight = new Array();
  let secondTree = new Array();
  //let checkValid = new Array();
  let currFirstTree = new Array();
  let request = firstTree.map((el, i) => {
    let VCopy = new Array();
    currFirstTree[i] = new Array();
    V.forEach((item, index) => (VCopy[index] = item));
    V.forEach((item, index) => {
      if (el.v === item.v && el.to === item.to) {
        VCopy.splice(index, 1);
        currFirstTree[i] = findFirstTree(VCopy);
        return;
      }
    });
    console.log(VCopy.length);
    if (currFirstTree[i].length < n - 1) {
      weight[i] = 101000;
    } else {
      weight[i] = 0;
      currFirstTree[i].forEach(el => (weight[i] += el.w));
    }
  });
  let promise = await Promise.all(request);
  if (promise) {
    let k = 101000;
    for (let i = 1; i < n; i++) {
      if (weight[i] && weight[i] < k) {
        k = weight[i];
        secondTree = currFirstTree[i];
      }
    }
    let element = document.createElement("span");
    element.innerHTML = "second spanning tree:";
    body.appendChild(element);
    secondTree.forEach(el => {
      let element = document.createElement("span");
      element.innerHTML =
        "{v: " + el.v + ", weight: " + el.w + ", to: " + el.to + "}";
      body.appendChild(element);
    });
  }
}
create.onclick = e => {
  e.preventDefault;
  body.innerHTML = "";
  V = new Array();
  n = document.querySelector(".treeN").value;
  n = Number.parseInt(n);
  if (isNaN(n) || n < 3 || n > 20) {
    return alert("data is incorrect");
  }
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (j === i + 1) {
        V.push({ v: i, w: getRandomIntInclusive(1, 100), to: j });
        continue;
      }
      if (Math.round((Math.random() * 4) / 5)) {
        V.push({ v: i, w: getRandomIntInclusive(1, 100), to: j });
      }
    }
  }
  V.forEach(el => {
    let element = document.createElement("span");
    element.innerHTML =
      "{v: " + el.v + ", weight: " + el.w + ", to: " + el.to + "}";
    body.appendChild(element);
  });
  check = true;
};

find.onclick = e => {
  e.preventDefault;
  if (!check) {
    return alert("you didnt create tree");
  }
  let element = document.createElement("span");
  element.innerHTML = "first spanning tree:";
  body.appendChild(element);
  let VCopy = new Array();
  V.forEach((el, i) => (VCopy[i] = el));
  firstTree = findFirstTree(VCopy);
  firstTree.forEach(el => {
    let element = document.createElement("span");
    element.innerHTML =
      "{v: " + el.v + ", weight: " + el.w + ", to: " + el.to + "}";
    body.appendChild(element);
  });
  findSecondTree();
};
