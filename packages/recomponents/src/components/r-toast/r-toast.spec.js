import {createLocalVue, shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RToast from './r-toast.vue';
import RToastPlugin from '../../plugins/r-toast-manager';

describe('r-toast.vue', () => {
    const props = {
        type: 'test',
        message: 'test toast',
        title: '',
        visible: true,
    };
    const localVue = createLocalVue();
    localVue.use(RToastPlugin);

    it('should render Wrapper and match snapshot', async () => {
        // const wrapper = localVue.$toast.positive(props.message, {autoHide: false});
        const wrapper = shallowMount(RToast, {
            props,
        });
        expect(wrapper).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RToast, {
            propsData: {
                ...props,
            },
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should set a class by type prop', async () => {
        const type = 'test';
        const wrapper = shallowMount(RToast, {
            propsData: {
                type,
            },
        });
        expect(wrapper.classes()).toContain(`r-toast-${type}`);
    });

    it('should create toasts via toast-manager', async () => {
        const message = `This is a manager's toast!`;
        localVue.$toast.positive(message, {autoHide: false});
        localVue.$toast.negative(message, {autoHide: false});
        localVue.$toast.warning(message, {autoHide: false});
        localVue.$toast.info(message, {autoHide: false});
        const managerToasts = [...document.getElementsByClassName(`r-toast`)]
            /* eslint-disable no-underscore-dangle */
            .map(toast => toast.__vue__)
            .filter(toast => toast._props && toast._props.message === message);
            /* eslint-enable no-underscore-dangle */

        expect(managerToasts).toHaveLength(4);
    });

    it('should create toasts from errors via toast-manager', async () => {
        const error = new Error();
        const toastMessage = 'Custom error text';
        localVue.$toast.fromError(error, toastMessage);
        const hasToastAppeared = [...document.getElementsByClassName(`r-toast`)]
            /* eslint-disable no-underscore-dangle */
            .map(toast => toast.__vue__)
            .some(toast => toast._props && toast._props.message === toastMessage);
            /* eslint-enable no-underscore-dangle */

        expect(hasToastAppeared).toBe(true);
    });
});
