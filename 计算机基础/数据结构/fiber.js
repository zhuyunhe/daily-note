class Node {
  constructor(instance){
    this.instance = instance
    this.child = null
    this.sibling = null
    this.return = null
  }
}

function link(parent, elements) {
  if(elements === null) elements = []
  parent.child = elements.reduceRight((prev, cur) => {
    const node = new Node(cur)
    node.sibling = prev
    node.return = parent
    return node
  }, null)
  parent.render = () => console.log(elements.map(item => item.name))
  return parent.child
}

const parent = new Node({name: 'a1'})
const children = [{ name: 'b1' }, { name: 'b2' }, { name: 'b3' }];

const b1 = link(parent, children);
const b2 = b1.sibling
const children_b2 = [{ name: 'c1' }];
const c1 = link(b2, children_b2)

const b3 = b2.sibling
const children_b3 = [{ name: 'c2' }];
const c2 = link(b3, children_b3)

const children_c1 = [{ name: 'd1' }, {name: 'd2'}]
link(c1, children_c1)

/* 
render方法
*/

function doWork(node){
  // console.log(node.instance.name)
  if(node.render){
    // node.render()
  }
  return node.child
}

var isYield = false

function walk(o) {
  let root = o
  let current = o

  while(true){
    console.log(current.instance.name)
    let child = doWork(current)
    if(child){
      current = child
      continue
    }
    if(current === root){
      console.log('root')
      return
    }

    while (!current.sibling) {
      // if we have returned to the top, exit the function
      if (!current.return || current.return === root) {
        return;
      }

      current = current.return
    }
    current = current.sibling
  }
}
// console.log(parent.child)
walk(parent)
