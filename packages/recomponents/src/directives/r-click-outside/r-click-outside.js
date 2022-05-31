/**
 * Simple directive to add click-outside detection to a component
 */
export default {
    bind(element, {value}) {
        element.clickOutside = (event) => {
            if (!element.contains(event.target)) {
                value(event);
            }
        };
        window.document.addEventListener('mousedown', element.clickOutside, true);
    },
    unbind(element) {
        window.document.removeEventListener('mousedown', element.clickOutside);
        element.clickOutside = null;
    },
};
