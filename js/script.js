'use strict';

const skills = {
    data: [
        {namenav : 'html', lvlskill : 45, cssclass : 'skill-level', iconskill : 'html.svg'},
        {namenav : 'css', lvlskill : 25, cssclass : 'skill-level', iconskill : 'css.svg'},
        {namenav : 'c++', lvlskill : 55, cssclass : 'skill-level', iconskill : 'c++.svg'},
        {namenav : 'python', lvlskill : 70, cssclass : 'skill-level', iconskill : 'python.svg'}
    ],

    generateList() {

        const skillList = document.querySelector('dl.skill-list');

        this.data.forEach(item => {
            const dt = document.createElement('dt');
            const dd = document.createElement('dd');
            const div = document.createElement('div');

            dt.style.backgroundImage = `url("../img/${item.iconskill}")`;

            div.classList.add(item.cssclass);

            dt.textContent = item.namenav;

            div.style.width = `${item.lvlskill}%`;

            dd.append(div);

            skillList.append(dt);
            skillList.append(dd);
        });
    }
};

skills.generateList();


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


