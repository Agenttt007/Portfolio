'use strict';

const skills = {
    data: [
        { namenav: 'html', lvlskill: 45, iconskill: 'html.svg' },
        { namenav: 'css', lvlskill: 25, iconskill: 'css.svg' },
        { namenav: 'c++', lvlskill: 55, iconskill: 'c++.svg' },
        { namenav: 'python', lvlskill: 70, iconskill: 'python.svg' }
    ],

    generateList(parentElement) {

        this.data.forEach(item => {
            const dt = document.createElement('dt');
            const dd = document.createElement('dd');
            const div = document.createElement('div');

            dt.style.backgroundImage = `url("img/${item.iconskill}")`;

            dd.classList.add('skill-level');

            dt.textContent = item.namenav;

            div.style.width = `${item.lvlskill}%`;

            dd.append(div);

            parentElement.append(dt, dd);
        });
    }
};

const skillList = document.querySelector('dl.skill-list');

skills.generateList(skillList);
