class QElement {
  constructor(element, priority){
    this.element = element;
    this.priority = priority;
  }
}
/* 
1. Each element of the priority queue has an property associated with it.
2. Elements are added to the queue as per the priority.
3. Lowest priority elements are removed first.
*/
class PriorityQueue {
  constructor(){
    // container of QElement
    this.items = [];
  }

  // functions to be implemented 
  // enqueue(item, priority) 
  // dequeue() 
  // front() 
  // isEmpty() 
  // printPQueue() 

  enqueue(element, priority){
    let qElement = new QElement(element, priority);
    let contain = false;
    for(let i=0; i<this.items.length; i++) {
      if(this.items[i].priority > priority) {
        this.items.splice(i, 0, qElement);
        contain = true;
        break;
      }
    }

    if(!contain){
      this.items.push(qElement);
    }
  }

  dequeue(){
    if(this.isEmpty()){
      return 'underflow'
    }
    return this.items.shift();
  }

  front(){
    if(this.isEmpty()){
      return 'No elements is Queue'
    }
    return this.items[0];
  }

  rear(){
    if (this.isEmpty()) {
      return "No elements in Queue";
    }
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  printPQueue() {
    var str = "";
    for (var i = 0; i < this.items.length; i++){
      str += this.items[i].element + " ";
    }
    return str;
  } 
}