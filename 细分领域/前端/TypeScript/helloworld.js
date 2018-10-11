var Studeng = /** @class */ (function () {
    function Studeng(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Studeng;
}());
function greeter(person) {
    return "hello, " + person.firstName + " " + person.lastName;
}
var user = new Studeng("Jane", "M.", "User");
var isDone = false;
console.log(greeter(user));
