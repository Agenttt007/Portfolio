'use strict';

const skills = {
    data: [],
    sortMode: null,
    skillList: null,
    skillsSection: null,
    skillsSortBlock: null,

    init(elements){
        this.skillList = elements.skillList;
        this.skillsSection = elements.skillsSection;
        this.skillsSortBlock = elements.skillsSortBlock;
    },

    loadData() {
        return fetch('db/skills.json')
            .then(response => response.json())
            .then(data => {
                this.data = data.skillsData;
                this.generateList();
                this.showSection();
                return this.data;
            })
            .catch(error => {
                this.hideSection();
                throw error;
            });
    },

    showSection() {
        if (this.skillsSection) {
            this.skillsSection.classList.add('show');
        }
    },

    generateList() {
        this.skillList.innerHTML = '';

        this.data.forEach(item => {
            const dt = document.createElement('dt');
            const dd = document.createElement('dd');
            const div = document.createElement('div');

            const iconPath = item.iconSkill ? `url("img/${item.iconSkill}")` : '';
            const skillName = item.nameNav || 'Неизвестный навык';
            const skillLevel = Math.min(Math.max(item.lvlSkill || 0, 0), 100);

            dt.style.backgroundImage = iconPath;
            dt.textContent = skillName;

            dd.classList.add('skill-level');
            div.style.width = `${skillLevel}%`;
            div.textContent = `${skillLevel}%`;

            dd.append(div);
            this.skillList.append(dt, dd);
        });
    },

    sortList(sortType) {
        if (!this.data || this.data.length === 0) {
            return;
        }

        if (this.sortMode === sortType) {
            this.data.reverse();
        } else {
            if (sortType === 'name') {
                this.data.sort(this.getComparer('nameNav'));
            } else if (sortType === 'level') {
                this.data.sort(this.getComparer('lvlSkill'));
            }
            this.sortMode = sortType;
        }

        this.generateList();
    },

    getComparer(prop) {
        return function (a, b) {
            const valA = a[prop];
            const valB = b[prop];

            if (valA < valB) return -1;
            if (valA > valB) return 1;
            return 0;
        };
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const skillList = document.querySelector('dl.skill-list');
    const skillsSection = document.querySelector('.skills');
    const skillsSortBlock = document.querySelector('.section-skills-button-sort');
    const themeCheckbox = document.querySelector('.switch-checkbox');
    const viewMenu = document.querySelector('.main-nav');
    const btnViewMenu = document.querySelector('.nav-btn');

    skills.init({
        skillList: document.querySelector('dl.skill-list'),
    skillsSection: document.querySelector('.section-skills'),
    skillsSortBlock: document.querySelector('.section-skills-button-sort')
    });

    if (skillsSection) {
        skillsSection.style.display = 'none';
    }

    skills.loadData();

    if (skillsSortBlock) {
        skillsSortBlock.addEventListener('click', (e) => {
            if (e.target.nodeName === 'BUTTON') {
                if (!skills.data || skills.data.length === 0) {
                    return;
                }
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
    }

    if (localStorage.getItem('theme') === 'light') {
        if (themeCheckbox) themeCheckbox.checked = true;
        document.body.classList.remove('dark-theme');
    } else {
        if (themeCheckbox) themeCheckbox.checked = false;
        document.body.classList.add('dark-theme');
    }

    if (themeCheckbox) {
        themeCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    const menu = {
        viewMenu: viewMenu,
        btnViewMenu: btnViewMenu,

        close() {
            if (this.viewMenu) this.viewMenu.classList.add('main-nav_closed');
            if (this.btnViewMenu) {
                this.btnViewMenu.classList.remove('nav-btn_close');
                this.btnViewMenu.classList.add('nav-btn_open');
                this.btnViewMenu.innerHTML = '<span class="visually-hidden">Открыть меню</span>';
            }
        },

        open() {
            if (this.viewMenu) this.viewMenu.classList.remove('main-nav_closed');
            if (this.btnViewMenu) {
                this.btnViewMenu.classList.remove('nav-btn_open');
                this.btnViewMenu.classList.add('nav-btn_close');
                this.btnViewMenu.innerHTML = '<span class="visually-hidden">Закрыть меню</span>';
            }
        }
    };

    if (menu.btnViewMenu) {
        menu.btnViewMenu.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-btn_open')) {
                menu.open();
            } else {
                menu.close();
            }
        });
    }

    menu.close();
});
