'use strict';

const skills = {
    data: [
        { nameNav: 'html', lvlSkill: 45, iconSkill: 'html.svg' },
        { nameNav: 'css', lvlSkill: 25, iconSkill: 'css.svg' },
        { nameNav: 'c++', lvlSkill: 55, iconSkill: 'c++.svg' },
        { nameNav: 'python', lvlSkill: 70, iconSkill: 'python.svg' }
    ],

    sortMode: null,

    generateList(parentElement) {

        parentElement.innerHTML = '';

        this.data.forEach(item => {
            const dt = document.createElement('dt');
            const dd = document.createElement('dd');
            const div = document.createElement('div');

            dt.style.backgroundImage = `url("img/${item.iconSkill}")`;

            dd.classList.add('skill-level');

            dt.textContent = item.nameNav;

            div.style.width = `${item.lvlSkill}%`;

            dd.append(div);

            parentElement.append(dt, dd);
        });
    },

    sortList(sortType) {

        if (this.sortMode === sortType) {
            this.data.reverse();
            console.log('инвертировали порядок сортировки');

        } else {
            if (sortType === 'name') {
                this.data.sort(getComparer('nameNav'));
                console.log('отсортировали по имени');

            } else if (sortType === 'level') {
                this.data.sort(getComparer('lvlSkill'));
                console.log('отсортировали по уровню');
            }

            this.sortMode = sortType;
        }

        this.generateList(skillList);
    }
};

const skillList = document.querySelector('dl.skill-list');

skills.generateList(skillList);

const skillsSortBlock = document.querySelector('.section-skills-button-sort');

function getComparer(prop) {
    return function (a, b) {
        if (a[prop] < b[prop]) {
            return -1;
        }
        if (a[prop] > b[prop]) {
            return 1;
        }
        return 0;
    };
}



skillsSortBlock.addEventListener('click', (e) => {
    if (e.target.nodeName === 'BUTTON') {
        console.log('Клик по кнопке:', e.target);
        console.log('Текст кнопки:', e.target.textContent);

        switch (e.target.dataset.type) {
            case 'name':
                skills.sortList('name');
                break;

            case 'level':
                skills.sortList('level');
                break;

            default:

        }
    }
});

const viewMenu = document.querySelector('.main-nav');

console.log(viewMenu);

const btnviewMenu = document.querySelector('.nav-btn');

console.log(btnviewMenu);

const menu = {
    viewMenu: document.querySelector('.main-nav'),
    btnviewMenu: document.querySelector('.nav-btn'),

    close() {
        this.viewMenu.classList.add('main-nav_closed');
        this.btnviewMenu.classList.remove('nav-btn_close');
        this.btnviewMenu.classList.add('nav-btn_open');
        this.btnviewMenu.innerHTML = '<span class="visually-hidden">Открыть меню</span>';
    },

    open() {
        this.viewMenu.classList.remove('main-nav_closed');
        this.btnviewMenu.classList.remove('nav-btn_open');
        this.btnviewMenu.classList.add('nav-btn_close');
        this.btnviewMenu.innerHTML = '<span class="visually-hidden">Закрыть меню</span>';
    }
};

menu.btnviewMenu.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-btn_open')) {
        menu.open();
    } else {
        menu.close();
    }
});

menu.close();

