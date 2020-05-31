class Node{
  constructor(element){
    this.element = element;
    this.next = null;
  }
}

class LinkedList{
  constructor(){
    this.head = null; // first node of the list
    this.size = 0;
  }

  add(element) {
    let node = new Node(element)
    let current = null;
    if(!this.head){
      this.head = node;
    } else{
      current = this.head;
      while(current.next){
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  insertAt(element, index) {
    if(index<0 || (index > this.size)){
      return false;
    } else{
      let node = new Node(element);
      let current = this.head;
      let prev = null;
      if(index === 0){
        node.next = current;
        this.head = node;
      } else{
        let i = 0;
        while(i < index){
          prev = current;
          current = prev.next;
          i++;
        }
        node.next = current;
        prev.next = node;
      }
    }
    this.size++;
  }

  removeFrom(index) {
    if (index < 0 || (index > this.size)) {
      return -1;
    } else {
     let i = 0;
     let current = this.head;
     let prev = null;
     if(index === 0) {
       this.head = current.next;
     } else {
       while (i < index) {
        prev = current;
        current = prev.next;
        i++;
       }
       prev.next = current.next;
     }
     this.size --;
     return current.element;
    }
  }

  removeElement(element) {
    if(this.size < 1){
      return -1;
    }
    let current = this.head;
    let prev = null;
    while(current){
      if (current.element === element){
        if(prev === null){
          this.head = current.next;
        } else {
          prev.next = current.next;
        }
        this.size--;
        return current.element
      } else{
        prev = current;
        current = prev.next;
      }
    }
    return -1;
  }

  indexOf(element) {
    let count = 0;
    let current = this.head;
    while(current){
      if(current.element === element){
        return count;
      } else{
        current = current.next;
        count++;
      }
    }

    return -1;
  }

  isEmpty(){
    return this.size === 0;
  }

  // prints the list items 
  printList() {
    var current = this.head;
    var str = "";
    while (current) {
      str += current.element + " ";
      current = current.next;
    }
    console.log(str);
  } 

}

var ll = new LinkedList();

// testing isEmpty on an empty list 
// returns true 
console.log(ll.isEmpty());

// adding element to the list 
ll.add(10);

// prints 10 
ll.printList();

// returns 1 

// adding more elements to the list 
ll.add(20);
ll.add(30);
ll.add(40);
ll.add(50);

// returns 10 20 30 40 50 
ll.printList();

// prints 50 from the list 
console.log("is element removed ?" + ll.removeElement(50));

// prints 10 20 30 40 
ll.printList();

// returns 3 
console.log("Index of 40 " + ll.indexOf(40));

// insert 60 at second position 
// ll contains 10 20 60 30 40 
ll.insertAt(60, 2);

ll.printList();

// returns false 
console.log("is List Empty ? " + ll.isEmpty());

// remove 3rd element from the list 
console.log(ll.removeFrom(3));

// prints 10 20 60 40 
ll.printList(); 