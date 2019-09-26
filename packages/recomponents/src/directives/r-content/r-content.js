import Vue from 'vue';

const directive = {
    inserted: (el, {modifiers}) => {
        const parentClass = el.parentElement.className;
        const particle = modifiers.secondary ? '--secondary' : '--primary';
        el.classList.add(`${parentClass}${particle}`);
    },
    unbind: (el) => {
        el.className = '';
    },
};

Vue.directive('content', directive);
