'use strict';

//let user = {};
//let useR = new Object();

let user = {
    name: "John",
    age: 30,
    sayHi: function () {
        console.log ('Меня зовут ${this.name}' ) ;
    }
};

user.sayHi();

console.log(user);