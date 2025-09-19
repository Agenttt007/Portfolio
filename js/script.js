'use strict';

const data = [
    {namenav : 'html', lvlskill : 45, cssclass : "skill-level"},
    {namenav : 'css', lvlskill : 25, cssclass : "skill-level"},
    {namenav : 'python', lvlskill : 70, cssclass : 'skill-level'},
    {namenav : 'c++', lvlskill : 55, cssclass : 'skill-level'}
]

const skillList = document.querySelector('dl.skill-list');

data.forEach(item => {
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    const div = document.createElement('div');

    div.classList.add(item.cssclass);

    dt.textContent = item.namenav;

    div.style.width = `${item.lvlskill}%`;

    dd.append(div);

    skillList.append(dt);
    skillList.append(dd);
});




console.log(skillList);


/*const phoneinput = document.querySelector('input[type=phone]');
const  box = document.querySelector('#box');
        circles = document.querySelectorAll('.circle');
        div = document.createElement('div');*/


//console.log(box);
//box.computedStyleMap.color = 'blue';
//box.style.cssText = 'background-color: blue; color: red';

/*circles.forEach(item => {
    item.classList.toogle('after');
});

console.log(circles);

const style = document.createElement('link');

style.rel = 'stylesheet';
style.href = 'css/new.css';

console.log(style);

document.head.append(style);

style.remove();*/


