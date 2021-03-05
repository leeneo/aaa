var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
    }
    return Student;
}());
function greeter(person) {
    // return "Hello," + person.firstName + ' ' + person.lastName;
    console.log(person);
    return "Hello," + person.firstName + person.lastName;
}
var user = { firstName: '李', lastName: 'Neo' };
var ele = document.body || document.documentElement;
ele.innerText = greeter(user);
