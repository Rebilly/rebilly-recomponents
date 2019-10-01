import VueI18n from 'vue-i18n';
import RBadge from './components/r-badge/r-badge.vue';
import RButton from './components/r-button/r-button.vue';
import RCheckbox from './components/r-checkbox/r-checkbox.vue';
import RDropdown from './components/r-dropdown/r-dropdown.vue';
import RIcon from './components/r-icon/r-icon.vue';
import RIconButton from './components/r-icon-button/r-icon-button.vue';
import RImg from './components/r-img/r-img.vue';
import RInput from './components/r-input/r-input.vue';
import RLoader from './components/r-loader/r-loader.vue';
import RRadio from './components/r-radio/r-radio.vue';
import RSelect from './components/r-select/r-select.vue';
import RTile from './components/r-tile/r-tile.vue';
import RTimePicker from './components/r-time-picker/r-time-picker.vue';

import './styles/typography.scss';
import './styles/theme.scss';

const components = {
    RBadge,
    RButton,
    RCheckbox,
    RDropdown,
    RIcon,
    RIconButton,
    RImg,
    RInput,
    RLoader,
    RRadio,
    RSelect,
    RTile,
    RTimePicker,
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
    RDropdown,
    RIcon,
    RIconButton,
    RImg,
    RInput,
    RLoader,
    RRadio,
    RSelect,
    RTile,
    RTimePicker,
};

export default {
    install,
    ...components,
};
