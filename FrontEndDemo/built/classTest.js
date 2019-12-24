var TestObj;
(function (TestObj) {
    var Student = /** @class */ (function () {
        // firstName:string='';
        // lastName:string='';
        function Student(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.fullName = firstName + ' ' + lastName;
        }
        return Student;
    }());
    function greeter() {
        var s = new Student('星', '之痕');
        return "Hello," + s.firstName + s.lastName;
    }
    // let user = { firstName: '星', lastName: '辰' }
    var ele = document.body || document.documentElement;
    ele.innerText = greeter();
})(TestObj || (TestObj = {}));
