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
import RTile from './components/r-tile/r-tile.vue';

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
    RTile,
};

function install(Vue) {
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
    RTile,
};

export default {
    install,
    ...components,
};
