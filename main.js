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

function multiPrintArray(tree) {
  console.log('Level-order:');
  let tmp = [];
  tree.levelOrderForEach((node) => {
    tmp.push(node.data);
  });
  console.log(tmp);
  console.log('Pre-order:')
  tmp = [];
  tree.preOrderForEach((node) => {
    tmp.push(node.data);
  });
  console.log(tmp);
  console.log('Post-order:')
  tmp = [];
  tree.postOrderForEach((node) => {
    tmp.push(node.data);
  });
  console.log(tmp);
  console.log('In-order:')
  tmp = [];
  tree.inOrderForEach((node) => {
    tmp.push(node.data);
  });
  console.log(tmp);
}

let array = randomArray(10);
let myTree = new Tree(array);
console.log('Is my tree balanced? ' + myTree.isBalanced());
multiPrintArray(myTree);
myTree.insertValue(110);
myTree.insertValue(114);
myTree.insertValue(115);
myTree.insertValue(117);
myTree.insertValue(119);
console.log('Is my tree balanced? ' + myTree.isBalanced());
console.log('Calling rebalance()');
myTree.rebalance();
console.log('Is my tree balanced? ' + myTree.isBalanced());
multiPrintArray(myTree);

