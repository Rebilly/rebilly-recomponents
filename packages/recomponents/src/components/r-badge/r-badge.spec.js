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

    it('should validate all incoming props', () => {
        const {type} = RBadge.props;

        expect(type.validator('default')).toBeTruthy();
        expect(type.validator('positive')).toBeTruthy();
        expect(type.validator('negative')).toBeTruthy();
        expect(type.validator('warning')).toBeTruthy();
        expect(type.validator('info')).toBeTruthy();
        expect(type.validator('tag')).toBeTruthy();
        expect(type.validator('tag-secondary')).toBeTruthy();
        expect(type.validator('impossible')).toBeFalsy();
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

        expect(wrapper.classes()).toContain('has-icon-close');
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
