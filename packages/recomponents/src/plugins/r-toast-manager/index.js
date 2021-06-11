import RToast from '../../components/r-toast/r-toast.vue';
import RToastManager from './r-toast-manager';

const RToastPlugin = RToast;

RToastPlugin.install = (Vue, options = {}) => {
  const methods = RToastManager(Vue, options);
  Vue.$toast = methods;
  Vue.prototype.$toast = methods;
};

export { RToastManager };
export default RToastPlugin;
