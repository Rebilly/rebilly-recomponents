import {mount, shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RBadge from './r-badge.vue';
import RIcon from '../r-icon/r-icon.vue';

describe('r-badge.vue', () => {
    it('renders default badge correctly', () => {
        const wrapper = shallowMount(RBadge, {
            propsData: {},
        });
        // this is the span
        expect(wrapper.element.nodeName).toEqual('SPAN');
        // the wrapper class name should contain type default
        expect(wrapper.attributes('class')).toContain('r-badge-default');
        // badge haven't the icon
        expect(wrapper.contains(RIcon)).toBe(false);
    });

    it('should render Wrapper and match snapshot', async () => {
        const wrapper = mount(RBadge, {
            slots: {
                default: 'text',
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RBadge, {
            slots: {
                default: 'text',
            },
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should render default value if prop is falsy', () => {
        const wrapper = mount(RBadge, {
            props: {
                type: false,
            },
        });

        expect(wrapper.classes()).toContain('r-badge-default');
    });

    it('should render component with type prop', () => {
        const wrapper = mount(RBadge, {
            propsData: {
                type: 'warning',
            },
            slots: {
                badge: '<strong>warning message</strong>',
            },
        });

        expect(wrapper.classes()).toContain('r-badge-warning');
    });

    it('should render component with close icon', () => {
        const wrapper = mount(RBadge, {
            propsData: {
                close: true,
            },
        });

        expect(wrapper.classes()).toContain('r-badge-has-icon-close');
        expect(wrapper.contains(RIcon)).toBe(true);
    });

    it('should emit event click on close icon', () => {
        const wrapper = mount(RBadge, {
            propsData: {
                close: true,
            },
        });

        wrapper.find(RIcon).trigger('click');
        expect(wrapper.emitted('close')).not.toBe(undefined);
    });
});
