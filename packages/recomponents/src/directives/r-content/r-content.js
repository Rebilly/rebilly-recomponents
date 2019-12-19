/**
 * Simple directive to add additional content to RTile
 */
export default {
    inserted: (el, {modifiers}) => {
        const parentClass = el.parentElement.className;
        const particle = modifiers.secondary ? '-is-secondary' : '-is-primary';
        el.classList.add(`${parentClass}${particle}`);
    },
    unbind: (el) => {
        el.className = '';
    },
};
