'use strict';

fetch('db/skills.json')
    .then(response => response.json())
    .then(data => {
        skills.data = data.skillsData;
        skills.generateList(skillList);
    })
    .catch(error => console.error('Ошибка при загрузке данных:', error));

const skills = {
    data: [],

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
        } else {
            if (sortType === 'name') {
                this.data.sort(getComparer('nameNav'));
            } else if (sortType === 'level') {
                this.data.sort(getComparer('lvlSkill'));
            }

            this.sortMode = sortType;
        }

        this.generateList(skillList);
    }
};

const skillList = document.querySelector('dl.skill-list');

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillsSection.style.display = 'none';
}

const themeCheckbox = document.querySelector('.switch-checkbox');

if (localStorage.getItem('theme') === 'light') {
    themeCheckbox.checked = true;
    document.body.classList.remove('dark-theme');
} else {
    themeCheckbox.checked = false;
    document.body.classList.add('dark-theme');
}

themeCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
});

skills.getData('db/skills.json');

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

const menu = {
    viewMenu: document.querySelector('.main-nav'),
    btnViewMenu: document.querySelector('.nav-btn'),

    close() {
        this.viewMenu.classList.add('main-nav_closed');
        this.btnViewMenu.classList.remove('nav-btn_close');
        this.btnViewMenu.classList.add('nav-btn_open');
        this.btnViewMenu.innerHTML = '<span class="visually-hidden">Открыть меню</span>';
    },

    open() {
        this.viewMenu.classList.remove('main-nav_closed');
        this.btnViewMenu.classList.remove('nav-btn_open');
        this.btnViewMenu.classList.add('nav-btn_close');
        this.btnViewMenu.innerHTML = '<span class="visually-hidden">Закрыть меню</span>';
    }
};

menu.btnViewMenu.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-btn_open')) {
        menu.open();
    } else {
        menu.close();
    }
});

menu.close();
