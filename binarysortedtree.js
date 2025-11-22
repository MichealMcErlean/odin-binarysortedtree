export class Node {
  constructor(data = null) {
    this.data = data;
    this.left = null;
    this.right = null
  }
}

export class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    let set = new Set();
    array.forEach(value => {
      set.add(value);
    });
    let uniqueValueArray = [...set];
    uniqueValueArray.sort((a, b) => a - b );
    let root = this.recurBuildTree(uniqueValueArray, 0, uniqueValueArray.length -1);
    return root;
  }

  // Could do this with passing slice() arrays around, but just using references
  // to the same array saves memory
  recurBuildTree(array, start, end) {
    if (start > end) return null;

    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(array[mid]);

    root.left = this.recurBuildTree(array, start, mid - 1);
    root.right = this.recurBuildTree(array, mid + 1, end)

    return root;
  }
}