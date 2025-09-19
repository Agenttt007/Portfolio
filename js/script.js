'use strict';

//const phoneinput = document.querySelector('input[type=phone]');
/*const  box = document.querySelector('#box');
        circles = document.querySelectorAll('.circle');
        div = document.createElement('div');*/


//console.log(box);
//box.computedStyleMap.color = 'blue';
//box.style.cssText = 'background-color: blue; color: red';

/*circles.forEach(item => {
    item.classList.toogle('after');
});

console.log(circles);*/

const style = document.createElement('link');

style.rel = 'stylesheet';
style.href = 'css/new.css';

console.log(style);

document.head.append(style);

style.remove();

