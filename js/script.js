'use strict';

//let user = {};
//let useR = new Object();

let user = {
    name: "John",
    age: 30
};

function sayHi(){
    console.log("Hello");
}

user.sayHi = sayHi;
user.sayHi();
console.log(user);