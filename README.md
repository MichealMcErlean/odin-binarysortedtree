# Binary Search Tree Project
## for the Odin Project

## Functionality
`Tree` is a binary sorted tree. takes an array of integers as input. Will remove duplicates and sort the array provided.
Implements the following methods:
- `insertValue(value)` inserts the value into the tree.
- `deleteValue(value)` deletes the value, re-organising the tree if necessary.
- `find(value)` returns the node with the given value, or null if not present.
- `levelOrderForEach(callback)` traverses the array in breadth-first order, running the callback on each node.
- `inOrderForEach(callback), preOrderForEach(callback), postOrderForEach(callback)` traverse the array depth-first; using in-order, pre-order and post-order traversal respectively, running the callback on each node.
- `height(value)` returns the height (longest distance in edges from a leaf node) of the node holding the given value. Returns null if value not present.
- `depth(value)` returns the depth (number of edges in the path from the node to the root node) of the node holding the given value. Returns null if value not present.
- `isBalanced()` checks that the tree is balanced as a binary tree (for every node, the height difference between its left and right subtrees is no greater than 1, and both subtrees are themselves balanced).
- `rebalance()` rebalances the tree.

## Take-aways
I learnt how effective recursion is when it's appropriate. I'm not even sure how to begin approaching implementing some of these methods using iteration instead.
I need to go re-acquaint myself with the private member syntax for class methods. I have all these helper methods just hanging around that don't need to be publically exposed.
I realized how much progress I've already made doing the Odin Project. I honestly felt like `height(value)` and `depth(value)` were going to be road-blocks, but I managed to reason them out relatively painlessly. It's nice to feel like you're making progress.
