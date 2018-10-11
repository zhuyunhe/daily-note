interface Person {
  firstName: string,
  lastName: string
}

class Studeng {
  fullName: string;
  constructor(public firstName, public middleInitial, public lastName){
    this.fullName = firstName + " " + middleInitial + " " + lastName
  }
}

function greeter(person: Person){
  return "hello, " + person.firstName + " " + person.lastName
}

let user = new Studeng("Jane", "M.", "User")

let isDone : boolean = false

console.log(greeter(user))
