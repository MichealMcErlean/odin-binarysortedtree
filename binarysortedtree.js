export class Node {
  constructor(data = null) {
    this.data = data;
    this.left = null;
    this.right = null
  }
}

export class Tree {
  constructor(array) {
    this.root = this.#buildTree(array);
  }

  #buildTree(array) {
    let set = new Set();
    array.forEach(value => {
      set.add(value);
    });
    let uniqueValueArray = [...set];
    uniqueValueArray.sort((a, b) => a - b );
    let root = this.#recurBuildTree(uniqueValueArray, 0, uniqueValueArray.length -1);
    return root;
  }

  // Could do this with passing slice() arrays around, but just using references
  // to the same array saves memory
  #recurBuildTree(array, start, end) {
    if (start > end) return null;

    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(array[mid]);

    root.left = this.#recurBuildTree(array, start, mid - 1);
    root.right = this.#recurBuildTree(array, mid + 1, end)

    return root;
  }

  insertValue(data) {
    this.#recurInsertValue(this.root, data);
  }

  #recurInsertValue(root, data) {
    if (root === null) return new Node(data);

    if (data < root.data) {
      root.left = this.#recurInsertValue(root.left, data);
    } else {
      root.right = this.#recurInsertValue(root.right, data);
    }

    return root;
  }

  deleteValue(value) {
    this.#recurDeleteValue(this.root, value);
  }

  #recurDeleteValue(root, data) {
    if (root === null) {
      return root;
    }

    if (data < root.data) {
      root.left = this.#recurDeleteValue(root.left, data);
    } else if (data > root.data) {
      root.right = this.#recurDeleteValue(root.right, data);
    } else {
      // 0 or 1 child
      if (root.left === null) {
        return root.right;
      }
      if (root.right === null) {
        return root.left;
      }
      // 2 children
      let largestPredecessor = this.#getLargestPredecessor(root.left);
      root.data = largestPredecessor.data;
      root.left = this.#recurDeleteValue(root.left, largestPredecessor.data);
    }
    return root;
  }

  #getLargestPredecessor(root) {
    let currentNode = root;
    while (currentNode !== null && currentNode.right !==null) {
      currentNode = currentNode.right;
    }
    return currentNode;
  }

  find(value) {
    return this.#recurFind(this.root, value)
  }

  #recurFind(root, data) {
    if (root === null) {
      return null;
    }
    if (data < root.data) {
      root = this.#recurFind(root.left, data);
    } else if (data > root.data) {
      root = this.#recurFind(root.right, data);
    }
    return root;
  }

  levelOrderForEach(callback) {
    if (!callback) {
      throw new Error("Callback required as argument!");
    }
    try {
      let queue = [];
      let currentNode;
      queue.push(this.root);
      do {
        currentNode = queue.shift();
        if (currentNode.left !== null) {
          queue.push(currentNode.left);
        }
        if (currentNode.right !== null) {
          queue.push(currentNode.right);
        }
        callback(currentNode);
      } while (queue.length > 0);
    } catch (e) {
      console.log(e);
    }
  }

  inOrderForEach(callback) {
    if (!callback) {
      throw new Error("Callback required as argument!");
    }
    try {
      this.#recurInOrderForEach(callback, this.root);
    } catch (e) {
      console.log(e);
    }
  }

  #recurInOrderForEach(callback, root) {
    if (root === null) return;
    this.#recurInOrderForEach(callback, root.left);
    callback(root);
    this.#recurInOrderForEach(callback, root.right);
  }

  preOrderForEach(callback) {
    if (!callback) {
      throw new Error("Callback required as argument!");
    }
    try {
      this.#recurPreOrderForEach(callback, this.root);
    } catch (e) {
      console.log(e);
    }
  }

  #recurPreOrderForEach(callback, root) {
    if (root === null) return;
    callback(root);
    this.#recurPreOrderForEach(callback, root.left);
    this.#recurPreOrderForEach(callback, root.right);
  }

  postOrderForEach(callback) {
    if (!callback) {
      throw new Error("Callback required as argument!");
    }
    try {
      this.#recurPostOrderForEach(callback, this.root);
    } catch (e) {
      console.log(e);
    }
  }

  #recurPostOrderForEach(callback, root) {
    if (root === null) return;
    this.#recurPostOrderForEach(callback, root.left);
    this.#recurPostOrderForEach(callback, root.right);
    callback(root);
  }

  height(value) {
    let root = this.find(value);
    if (root === null) return null;
    let height;
    let heightLeft = this.#recurHeight(root.left);
    let heightRight = this.#recurHeight(root.right);
    height = heightLeft > heightRight ? heightLeft : heightRight;
    return height;
  }

  #recurHeight(root) {
    if (root === null) {
      return 0;
    }
    let heightLeft = 1 + this.#recurHeight(root.left);
    let heightRight = 1 + this.#recurHeight(root.right);
    return heightLeft > heightRight ? heightLeft : heightRight;
  }

  depth(value) {
    let target = this.find(value);
    if (target === null) {
      return null;
    }
    let depth = 0;
    let currentNode = this.root;
    while (currentNode.data != value) {
      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        currentNode = currentNode.right;
      }
      depth += 1;
    }
    return depth;
  }

  isBalanced() {
    let root = this.root;
    let heightLeft, heightRight, balanceLeft, balanceRight;
    if(root.left) {
      heightLeft = this.height(root.left.data);
    } else {
      heightLeft = 0;
    }
    if (root.right) {
      heightRight = this.height(root.right.data);
    } else {
      heightRight = 0;
    }
    balanceLeft = this.#recurIsBalanced(root.left);
    balanceRight = this.#recurIsBalanced(root.right);

    if (
      balanceLeft == true &&
      balanceRight == true &&
      Math.abs(heightLeft - heightRight) <= 1
    ) {
      return true;
    } else {
      return false;
    }
  }

  #recurIsBalanced(root) {
    if (root === null) return true;
    let heightLeft, heightRight, balanceLeft, balanceRight;
    if(root.left) {
      heightLeft = this.height(root.left.data);
    } else {
      heightLeft = 0;
    }
    if (root.right) {
      heightRight = this.height(root.right.data);
    } else {
      heightRight = 0;
    }
    balanceLeft = this.#recurIsBalanced(root.left);
    balanceRight = this.#recurIsBalanced(root.right);

    if (
      balanceLeft == true &&
      balanceRight == true &&
      Math.abs(heightLeft - heightRight) <= 1
    ) {
      return true;
    } else {
      return false;
    }
  }

  rebalance() {
    let newArray = [];
    this.levelOrderForEach((node) => {
      newArray.push(node.data);
    });
    this.root = this.#buildTree(newArray);
  }
}