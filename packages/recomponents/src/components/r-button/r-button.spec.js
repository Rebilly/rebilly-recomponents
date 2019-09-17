import {mount, shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RButton from './r-button.vue';

describe('r-button.vue', () => {
    it('renders props.msg when passed', () => {
        const msg = 'Apply';
        const wrapper = shallowMount(RButton, {
            propsData: {msg},
            mocks: {
                $t: () => msg,
            },
        });
        expect(wrapper.text()).toMatch(msg);
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RButton, {
            slots: {
                default: '<strong>default button</strong>',
            },
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should render component with type prop', () => {
        const wrapper = mount(RButton, {
            propsData: {
                type: 'danger',
            },
            slots: {
                badge: '<strong>danger button</strong>',
            },
        });

        expect(wrapper.classes()).toContain('r-button--type-warning');
    });

    it('should render component with size, fluid or disabled prop', () => {
        const $t = () => {
        };

        const wrapper = shallowMount(RButton, {
            propsData: {
                size: 'small',
                disabled: true,
                fluid: true,
            },
            slots: {
                badge: '<strong>small button</strong>',
            },
            mocks: {$t},
        });

        expect(wrapper.classes()).toContain('r-button--size-small');
        expect(wrapper.classes()).toContain('r-button--fluid');
        expect(wrapper.attributes().disabled).not.toBe(undefined);
    });
});
