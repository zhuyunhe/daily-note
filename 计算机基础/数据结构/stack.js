class Stack {
  constructor(){
     this.items = [];
  }
  push(item){
    this.items.push(item);
  }
  pop(){
    if(this.items.length === 0){
      return 'underflow'
    }
    return this.items.pop();
  }
  peek(){
    return this.items[this.items.length - 1];
  }

  isEmpty(){
    return this.items.length === 0;
  }

  printStack(){
    let str = '';
    for (var i = 0; i < this.items.length; i++)
      str += this.items[i] + " ";
    console.log(str)
    return str; 
  }
}

// 测试
/* var stack = new Stack();

console.log(stack.isEmpty())

console.log(stack.pop())

stack.push(1)
stack.push(2)
stack.push(3)
stack.push(4)

stack.printStack()

// returns 4 
console.log(stack.peek());

// returns 4 and remove it from stack 
console.log(stack.pop());  */

// 利用栈来处理后缀表达式
// 28+ 等于 2+8=10
function postFixEvaluation(exp) {
  let stack = new Stack();
  for(let i=0; i<exp.length; i++){
    let c = exp[i];
    if(!isNaN(c)){
      // string转number，并入栈
      stack.push(c - '0');
    } 
    // c是运算符
    else{
      let var1 = stack.pop();
      let var2 = stack.pop();
      if (var1 === 'underflow' || var2 === 'underflow'){
        return 'can not evaluate the postfix evaluation'
      }
      switch (c) {
        case '+':
          stack.push(var2 + var1);
          break;
        case '-':
          stack.push(var2 - var1);
          break;
        case '*':
          stack.push(var2 * var1);
          break;
        case '/':
          stack.push(var2 / var1);
          break;
        default:
          break;
      }
    }
  }
  return stack.pop()
}

console.log(postFixEvaluation("235*+8-"));  
