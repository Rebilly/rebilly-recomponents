import './polyfill';

import './styles/helpers.scss';
import './styles/theme.scss';

import NoSSR from 'vue-no-ssr';
import vDatePicker from 'v-calendar/lib/components/date-picker.umd';
import kebabCase from './common/helpers/kebab-case';
import RToastPlugin, {RToastManager} from './plugins/r-toast-manager';

import * as components from './components';
import * as directives from './directives';

function install(Vue, options = {}) {
    const {ErrorHandler, allowToastCloseButton} = options;

    /**
     * Set global settings
     */
    Vue.$recomponents = {};

    Vue.$recomponents.settings = {
        timezone: 'America/Montreal',
        ...options,
    };

    Vue.use(RToastPlugin, {
        ErrorHandler,
        allowClose: allowToastCloseButton,
    });

    try {
        Vue.component('v-date-picker', vDatePicker);
    } catch (error) {
        // Ignore errors when using Recomponents from @vue/compat mode
    }

    Vue.component('no-ssr', NoSSR);

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
