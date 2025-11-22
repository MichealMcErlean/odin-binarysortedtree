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