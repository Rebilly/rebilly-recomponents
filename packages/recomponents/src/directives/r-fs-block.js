/**
 * Simple directive to exclude element from Full Story
 * Adding 'fs-block' class
 * @see https://help.fullstory.com/technical-questions/exclude-elements
 */
export default {
    bind(el) {
        el.classList.add('fs-block');
    },
};
