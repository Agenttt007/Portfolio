'use strict';

const skills = {
    data: [
        { namenav: 'html', lvlskill: 45, iconskill: 'html.svg' },
        { namenav: 'css', lvlskill: 25, iconskill: 'css.svg' },
        { namenav: 'c++', lvlskill: 55, iconskill: 'c++.svg' },
        { namenav: 'python', lvlskill: 70, iconskill: 'python.svg' }
    ],

    sortMode: null,

    generateList(parentElement) {

        parentElement.innerHTML = '';

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
    },

    sortList(sortType) {

        if (this.sortMode === sortType) {
            this.data.reverse();
            console.log('инвертировали порядок сортировки');

        } else {
            if (sortType === 'name') {
                this.data.sort(getComparer('namenav'));
                console.log('отсортировали по имени');

            } else if (sortType === 'level') {
                this.data.sort(getComparer('lvlskill'));
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

const viewmenu = document.querySelector('.main-nav');

console.log(viewmenu);

const btnviewmenu = document.querySelector('.nav-btn');

console.log(btnviewmenu);

const menu = {
    viewmenu: document.querySelector('.main-nav'),
    btnviewmenu: document.querySelector('.nav-btn'),

    close() {
        this.viewmenu.classList.add('main-nav_closed');
        this.btnviewmenu.classList.remove('nav-btn_close');
        this.btnviewmenu.classList.add('nav-btn_open');
        this.btnviewmenu.innerHTML = '<span class="visually-hidden">Открыть меню</span>';
    },

    open() {
        this.viewmenu.classList.remove('main-nav_closed');
        this.btnviewmenu.classList.remove('nav-btn_open');
        this.btnviewmenu.classList.add('nav-btn_close');
        this.btnviewmenu.innerHTML = '<span class="visually-hidden">Закрыть меню</span>';
    }
};

menu.close();

menu.btnviewmenu.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-btn_open')) {
        menu.open();
    } else {
        menu.close();
    }
});

