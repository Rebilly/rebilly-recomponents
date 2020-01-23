import './polyfill';

import './styles/helpers.scss';
import './styles/theme.scss';

import kebabCase from './common/helpers/kebab-case';
import RToastPlugin, {RToastManager} from './plugins/r-toast-manager';

import * as components from './components';
import * as directives from './directives';

function install(Vue, options = {}) {
    const {ErrorHandler} = options;

    /**
     * Set global settings
     */
    Vue.$recomponents = {};

    Vue.$recomponents.settings = {
        timezone: 'America/Montreal',
        ...options,
    };

    Vue.use(RToastPlugin, {ErrorHandler});

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

export * from './directives';
export * from './components';

export default {
    install,
    ...directives,
    ...components,
    RToastManager,
};
