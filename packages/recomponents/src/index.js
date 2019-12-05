import './polyfill';

import './styles/typography.scss';
import './styles/helpers.scss';
import './styles/theme.scss';

import kebabCase from './common/helpers/kebab-case';

import * as components from './components';
import * as directives from './directives';

function install(Vue) {
    /**
     * Injecting all components according to their filenames
     */
    Object.keys(components).forEach((key) => {
        Vue.component(key, components[key]);
    });

    /**
     * Injecting all directives without 'r' prefix
     */
    Object.keys(directives).forEach((key) => {
        Vue.directive(kebabCase(key.substr(1)), directives[key]);
    });
}

<<<<<<< HEAD
export {
    RTooltip,
    RFsBlock,
    RLazy,
    RContent,
    RClickOutside,
};

export {
    RAvatar,
    RBadge,
    RButton,
    RButtonGroup,
    RCheckbox,
    RIcon,
    RIconButton,
    RImg,
    RInput,
    RLoader,
    RModal,
    RPagination,
    RPopper,
    RRadio,
    RSelect,
    RTab,
    RTabs,
    RTile,
    RDateInput,
};
=======
export * from './directives';
export * from './components';
>>>>>>> 7891a1eb9121c89fec468204fa4f8b08731286ac

export default {
    install,
    ...directives,
    ...components,
};
