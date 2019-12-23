import RToast from './r-toast.vue';
import RToastManager from './r-toast-manager';

const RToastPlugin = (Vue, options = {}) => {
    let methods = RToastManager(Vue, options);
    Vue.$toast = methods;
    Vue.prototype.$toast = methods;
};

RToast.install = RToastPlugin;

export default RToast;