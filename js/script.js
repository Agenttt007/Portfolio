'use strict';

const skills = {
    data: [],
    sortMode: null,

    loadData() {
        return fetch('db/skills.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
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

    showError(message) {
        const skillList = document.querySelector('dl.skill-list');
        if (skillList) {
            skillList.innerHTML = `<p class="error-message">${message}</p>`;
        }
        this.showSection();
    },

    showSection() {
        const skillsSection = document.querySelector('.section-skills');
        if (skillsSection) {
            skillsSection.classList.add('show');
        }
    },

    generateList() {
        const skillList = document.querySelector('dl.skill-list');
        if (!skillList) {
            return;
        }

        skillList.innerHTML = '';

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
            skillList.append(dt, dd);
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

        this.generateList(skillList);
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
    const skillsSection = document.querySelector('.skills');
    const skillList = document.querySelector('dl.skill-list');
    const skillsSortBlock = document.querySelector('.section-skills-button-sort');

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
