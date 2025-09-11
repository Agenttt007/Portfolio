'use strict';

//let user = {};
//let useR = new Object();

/*let user = {
    name: "John",
    age: 30,
    sayHi: function () {
        console.log(`Меня зовут ${this.name}`);
    }
};

user.sayHi();

console.log(user);
function User(name){
    this.name = name;
    this.isAdmin = false;
}

let user = new User('Вася');*/

const arr = [1, 22, 333];

/*for (let i = 0; i < arr.length; i++){
    console.log(arr[i]);
}

for (let item of arr){
    console.log(item);
}

console.log(arr);*/

arr.forEach((item, index, array) => {
    console.log(item);
    console.log(index);
    console.log(array);
});

