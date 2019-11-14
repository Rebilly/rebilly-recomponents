import VueI18n from 'vue-i18n';

import RTooltip from './directives/r-tooltip/r-tooltip';
import RFsBlock from './directives/r-fs-block';

import './styles/typography.scss';
import './styles/helpers.scss';
import './styles/theme.scss';

import RBadge from './components/r-badge/r-badge.vue';
import RButton from './components/r-button/r-button.vue';
import RButtonGroup from './components/r-button-group/r-button-group.vue';
import RCheckbox from './components/r-checkbox/r-checkbox.vue';
import RPopper from './components/r-popper/r-popper.vue';
import RIcon from './components/r-icon/r-icon.vue';
import RIconButton from './components/r-icon-button/r-icon-button.vue';
import RImg from './components/r-img/r-img.vue';
import RInput from './components/r-input/r-input.vue';
import RLoader from './components/r-loader/r-loader.vue';
import RModal from './components/r-modal/r-modal.vue';
import RPagination from './components/r-pagination/r-pagination.vue';
import RRadio from './components/r-radio/r-radio.vue';
import RTab from './components/r-tabs/r-tab.vue';
import RTabs from './components/r-tabs/r-tabs.vue';
import RSelect from './components/r-select/r-select.vue';
import RTile from './components/r-tile/r-tile.vue';
import RDateInput from './components/r-date-input/r-date-input.vue';
import RRepeater from './components/r-repeater/r-repeater.vue';
import RGrid from './components/r-grid/r-grid.vue';

const components = {
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
    RRepeater,
    RGrid,
};

const directives = {
    RTooltip,
    RFsBlock,
};

function install(Vue, options = {}) {
    Vue.use(VueI18n);

    /**
     * Set global settings
     */

    Vue.RecomponentsSettings = {
        timezone: 'America/Montreal',
        ...options,
    };

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
    RFsBlock,
};

export {
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
    RRepeater,
    RGrid,
};

export default {
    install,
    ...directives,
    ...components,
};
