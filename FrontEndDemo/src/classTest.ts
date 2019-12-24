module TestObj {


    class Student implements Person {
        fullName: string;
        // firstName:string='';
        // lastName:string='';

        constructor(public firstName: string, public lastName: string) {
            this.fullName = firstName + ' ' + lastName
        }
    }

    interface Person {
        firstName: string
        lastName: string
    }



    function greeter() {

        var s: Student = new Student('星', '之痕');

        return `Hello,${s.firstName}${s.lastName}`;
    }

    // let user = { firstName: '星', lastName: '辰' }

    var ele = document.body || document.documentElement
    ele.innerText = greeter()

}