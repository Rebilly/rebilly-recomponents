import VueI18n from 'vue-i18n';

import RTooltip from './directives/r-tooltip/r-tooltip';

import './styles/typography.scss';
import './styles/helpers.scss';
import './styles/theme.scss';

const RBadge = () => import(/* webpackChunkName: "r-badge" */ './components/r-badge/r-badge.vue');
const RButton = () => import(/* webpackChunkName: "r-button" */ './components/r-button/r-button.vue');
const RCheckbox = () => import(/* webpackChunkName: "r-checkbox" */ './components/r-checkbox/r-checkbox.vue');
const RPopper = () => import(/* webpackChunkName: "r-popper" */ './components/r-popper/r-popper.vue');
const RIcon = () => import(/* webpackChunkName: "r-icon" */ './components/r-icon/r-icon.vue');
const RIconButton = () => import(/* webpackChunkName: "r-icon-button" */ './components/r-icon-button/r-icon-button.vue');
const RImg = () => import(/* webpackChunkName: "r-img" */ './components/r-img/r-img.vue');
const RInput = () => import(/* webpackChunkName: "r-input" */ './components/r-input/r-input.vue');
const RLoader = () => import(/* webpackChunkName: "r-loader" */ './components/r-loader/r-loader.vue');
const RModal = () => import(/* webpackChunkName: "r-modal" */ './components/r-modal/r-modal.vue');
const RPagination = () => import(/* webpackChunkName: "r-pagination" */ './components/r-pagination/r-pagination.vue');
const RRadio = () => import(/* webpackChunkName: "r-radio" */ './components/r-radio/r-radio.vue');
const RTab = () => import(/* webpackChunkName: "r-tab" */ './components/r-tabs/r-tab.vue');
const RTabs = () => import(/* webpackChunkName: "r-tabs" */ './components/r-tabs/r-tabs.vue');
const RSelect = () => import(/* webpackChunkName: "r-select" */ './components/r-select/r-select.vue');
const RTile = () => import(/* webpackChunkName: "r-tile" */ './components/r-tile/r-tile.vue');

const components = {
    RBadge,
    RButton,
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
};

const directives = {
    RTooltip,
};

function install(Vue) {
    Vue.use(VueI18n);

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
        Vue.directive(key.substr(1).toLowerCase(), directives[key]);
    });
}

export {
    RTooltip,
};

export {
    RBadge,
    RButton,
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
};

export default {
    install,
    ...directives,
    ...components,
};
