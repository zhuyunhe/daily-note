
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
const root = new Node(1)
const a = new Node(2)
const b = new Node(3)
root.left = a
root.right = b
const c = new Node(4)
const d = new Node(5)
a.right = c
c.left = d
const e = new Node(6)
c.right = e

const inorder = function (root) {
  let current = root
  let stack = []
  let result = []
  while (current || stack.length) {
    while (current) {
      stack.push(current)
      current = current.left
    }
    current = stack.pop()
    result.push(current.data)
    current = current.right
  }
  return result
}

const preorder = (root) => {
  let current = root
  let stack = []
  let result = []
  while (current || stack.length) {
    while (current) {
      result.push(current.data)
      stack.push(current)
      current = current.left
    }
    current = stack.pop()
    current = current.right

  }
  return result
}

const postorder = (root) => {
  let current = root
  let stack = []
  let result = []
  let last = null
  while (current || stack.length) {
    while (current) {
      stack.push(current)
      current = current.left
    }
    current = stack[stack.length-1]
    if(!current.right || current.right == last){
      current = stack.pop()
      result.push(current.data)
      last = current
      current = null
    } 
    // 右节点存在 且没被访问过
    else {
      current = current.right
    }
  }
  return result
}

console.log(inorder(root))
console.log(preorder(root))
console.log(postorder(root))