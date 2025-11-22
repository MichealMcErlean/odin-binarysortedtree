import { Node, Tree } from './binarysortedtree.js';

function randomArray(length = 15, range = 100) {
  let array = [];
  let num;
  for (let i = 0; i < length; i++) {
    num = Math.floor(Math.random() * range + 1);
    array.push(num);
  }
  return array;
}

  const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

let testArray = randomArray();
console.log(testArray);
let testTree = new Tree(testArray);
prettyPrint(testTree.root);
testTree.insertValue(47);
prettyPrint(testTree.root);
testTree.deleteValue(47);
prettyPrint(testTree.root);

testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
testTree = new Tree(testArray);
testTree.insertValue(47);
prettyPrint(testTree.root);
testTree.deleteValue(47);
prettyPrint(testTree.root);
// testTree.deleteValue(4);
// prettyPrint(testTree.root);
console.log(testTree.find(7));
console.log(testTree.find(13));
console.log(testTree.find(18));