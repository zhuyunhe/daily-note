
/*
判断一棵树是不是二叉查找树的两个条件：
1 - 左右子树都是BST
2 - 左子树的最大值，小于根结点的值
3 - 右子树的最小值，大于根结点的值
*/

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

const MAX = Number.MAX_VALUE;
const MIN = Number.MIN_VALUE;
/*
一颗二叉树中有多少二叉查找树
自底向上遍历树，找出每个节点的左子树的最大值，右子树最小值，以及该节点的的子树中有多少个二叉查找书
*/
function numberOfBST(root){
  if(root === null){
    return [0, MIN, MAX, true];
  }
  if(root.left === null && root.right === null){
    return [1, root.data, root.data, true];
  }

  const L = numberOfBST(root.left);
  const R = numberOfBST(root.right);

  const bst = [0, MAX, MIN, false]

  // 找出以root为根结点的这棵子树的最大值和最小值
  bst[1] = Math.max(root.data, Math.max(L[1], R[1]));
  bst[2] = Math.min(root.data, Math.min(L[2], R[2]));

  // 只有当左右子树都是BST时，这棵树才可能是BST
  if (L[3] && R[3] && root.data > L[1] && root.data < R[2]) {
    bst[0] = 1 + L[0] + R[0];
    bst[3] = true;
  } else{
    bst[0] = L[0] + R[0];
    bst[3] = false;
  }

  return bst;
}



const root = new Node(5)
root.left = new Node(9)
root.right = new Node(3)
root.left.left = new Node(6)
root.right.right = new Node(4)
root.left.left.left = new Node(8)
root.left.left.right = new Node(7) 

/* 
        5
      /   \
     9     3
    / \     \
   6   7     4
  / \
 8   7
*/
console.log(numberOfBST(root))