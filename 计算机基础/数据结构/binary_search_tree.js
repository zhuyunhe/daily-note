class Node {
  constructor(data){
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor(){
    this.root = null;
  }

  insert(data){
    let newNode = new Node(data);
    if(this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode){
    if(newNode.data < node.data){
      if(node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else{
      if(node.right === null){
        node.right = newNode;
      } else{
        this.insertNode(node.right, newNode);
      }
    }
  }

  remove(data){
    this.root = this.removeNode(this.root, data);
  }

  removeNode(node, key){
    if(node === null){
      return null;
    }
    else if(key < node.data){
      node.left = this.removeNode(node.left, key)
      return node;
    } else if(key > node.data){
      node.right = this.removeNode(node.right, key)
      return node;
    } 
    // key === node.data，找到了要删除的节点
    else{
      if(node.left===null && node.right===null){
        node = null;
        return null;
      } else if(node.left === null){
        node = node.right;
        return node;
      } else if(node.right === null){
        node = node.left;
        return node;
      }
      // 如果左右子树都存在，那就从右子树中找出一个最小的节点来替换根节点
      let minNode = this.findMinNode(node.right);
      node.data = minNode.data;
      node.right = this.removeNode(node.right, minNode.data);
      return node;
    }
  }

  findMinNode(node){
    if(node.left === null){
      return node;
    } else {
      return this.findMinNode(node.left)
    }
  }
  
  // 中序遍历
  inorder(node) {
    if(node !== null) {
      this.inorder(node.left);
      console.log(node.data);
      this.inorder(node.right)
    }
  }

  // 先序遍历
  preorder(node) {
    if(node !== null) {
      console.log(node.data);
      this.preorder(node.left);
      this.preorder(node.right);
    }
  }

  // 后序遍历
  postorder(node) {
    if(node !== null) {
      this.postorder(node.left);
      this.postorder(node.right);
      console.log(node.data);
    }
  }

  getRootNode(){
    return this.root;
  }

  search(node, data) {
    if(node === null) {
      return null;
    }
    else if(data < node.data) {
      return this.search(node.left, data);
    }
    else if(data > node.data) {
      return this.search(node.right, data);
    }

    return node;
  }

  /* 找到树中第k大的节点 */
  findK(node, k){
    let count = 0
    let stack = []
    while (node || stack.length) {
      while(node){
        stack.push(node)
        node = node.left
      }
      if (stack.length) {
        node = stack[stack.length-1]
        count++
        // console.log(`k:${k}, count:${count}`)
        if(count === k){
          console.log(`第K大的数字是${node.data}`)
          return node
        }
        node = stack.pop()
        node = node.right
      }
    }
  }

}

var BST = new BinarySearchTree();

BST.insert(15)
BST.insert(25)
BST.insert(10)
BST.insert(7)
BST.insert(22)
BST.insert(17)
BST.insert(13)
BST.insert(5)
BST.insert(9)
BST.insert(27)

const root = BST.getRootNode()


BST.inorder(root)

BST.findK(root, 5)

module.exports = BinarySearchTree;
