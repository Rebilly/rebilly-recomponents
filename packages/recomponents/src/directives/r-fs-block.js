import Vue from 'vue';

/**
 * Simple directive to exclude element from Full Story
 * Adding 'fs-block' class
 * @see https://help.fullstory.com/technical-questions/exclude-elements
 */
const directive = {
    bind(el) {
        el.classList.add('fs-block');
    },
};

Vue.directive('fs-block', directive);

export default directive;
