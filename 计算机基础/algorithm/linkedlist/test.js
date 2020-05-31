/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }

  print(node){
    let str = '';
    while (node) {
      str += node.val;
      if(node.next){
        str += '->'
      }
      node = node.next;
    }
    console.log(str)
  }
}
var multiply = function (num1, num2) {
  if (num1 === '0' || num2 === '0') {
    return 0;
  }
  let l1 = new ListNode(0);
  let current1 = l1;
  let l2 = new ListNode(0);
  let current2 = l2;
  let num1Arr = num1.split('');
  let num2Arr = num2.split('');
  while (num1Arr.length) {
    current1.next = new ListNode(num1Arr.pop());
    current1 = current1.next
  }
  while (num2Arr.length) {
    current2.next = new ListNode(num2Arr.pop());
    current2 = current2.next;
  }
  l1 = l1.next;
  l2 = l2.next;
  l1.print(current1)
  l2.print(current2)

  const result = new ListNode(0)
  let current = result;
  let curry = 0;
  let weight = 1;
  while(l1 || l2){
    let sum = 0;
    if(l1 === null){
      sum = curry + l2.val;
    } else if(l2 === null){
      sum = curry + l1.val;
    } else {
      sum = curry + weight * l1.val * l2.val;
    }
    l1 = l1 ? l1.next : l1;
    l2 = l2 ? l2.next : l2;
    current.next = new ListNode(sum % 10);
    current = current.next;
    curry = parseInt(sum / 10);
    weight *= 10;
  }

  result.print(result.next)
};

multiply('223','11')