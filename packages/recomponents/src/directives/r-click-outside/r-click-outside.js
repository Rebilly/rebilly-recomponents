import Vue from 'vue';

const directive = {
    bind(element, binding, vNode) {
        element.vClickOutside = (event) => {
            if (!element.contains(event.target)) {
                vNode.context[binding.expression](event);
            }
        };
        window.document.addEventListener('mousedown', element.vClickOutside, true);
    },
    unbind(element) {
        window.document.removeEventListener('mousedown', element.vClickOutside);
        element.vClickOutside = null;
    },
};

Vue.directive('click-outside', directive);

export default directive;
