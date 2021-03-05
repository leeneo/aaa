class Student {
    fullName: string
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + ' ' + middleInitial + ' ' + lastName
    }
}

interface Person {
    firstName: string
    lastName: string
}
 


function greeter(person: Person) {
    // return "Hello," + person.firstName + ' ' + person.lastName;
    console.log(person);
    return `Hello,${person.firstName}${person.lastName}`;
}

let user = { firstName: '李', lastName: 'Neo' }

var ele = document.body || document.documentElement
ele.innerText = greeter(user)