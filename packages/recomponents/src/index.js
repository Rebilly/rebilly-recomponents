import VueI18n from 'vue-i18n';
import RBadge from './components/r-badge/r-badge.vue';
import RButton from './components/r-button/r-button.vue';
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

import './styles/typography.scss';
import './styles/theme.scss';

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

function install(Vue) {
    Vue.use(VueI18n);

    Object.keys(components).forEach((key) => {
        Vue.component(key, components[key]);
    });
}

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
    ...components,
};
