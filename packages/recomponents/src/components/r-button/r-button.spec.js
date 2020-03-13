import {mount, shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RButton from './r-button.vue';
import RIcon from '../r-icon/r-icon.vue';

describe('r-button.vue', () => {
    it('renders link correctly', () => {
        const href = `#href-value-${new Date().getTime()}`;
        const wrapper = shallowMount(RButton, {
            propsData: {type: 'link', href},
        });
        // this is the link
        expect(wrapper.element.nodeName).toEqual('A');
        // link has property href that equal to props value
        expect(wrapper.attributes('href')).toEqual(href);
    });

    it('renders default button correctly', () => {
        const wrapper = shallowMount(RButton, {
            propsData: {},
        });
        // this is the button
        expect(wrapper.element.nodeName).toEqual('BUTTON');
        // the button isn't disabled
        expect(wrapper.attributes('disabled')).toBe(undefined);
        // the title is empty
        expect(wrapper.attributes('title')).toEqual('');
        // button haven't the icon
        expect(wrapper.contains(RIcon)).toBe(false);
    });

    it('renders regular size by default', () => {
        const wrapper = shallowMount(RButton, {
            propsData: {},
        });
        expect(wrapper.classes('r-button-size-regular')).toBe(true);
    });

    it('renders default type by default', () => {
        const wrapper = shallowMount(RButton, {
            propsData: {},
        });
        expect(wrapper.classes('r-button-type-default')).toBe(true);
    });

    it('renders disabled button correctly', () => {
        const title = `disabled-${new Date().getTime()}`;
        const wrapper = shallowMount(RButton, {
            propsData: {
                disabled: true,
                title,
            },
        });
        // button has disabled attribute
        expect(wrapper.attributes('disabled')).toBe('disabled');
        // button has title
        expect(wrapper.attributes('title')).toEqual(title);
    });

    it('renders loading button correctly', () => {
        const title = `loading-${new Date().getTime()}`;
        const wrapper = shallowMount(RButton, {
            propsData: {
                loading: true,
                title,
            },
        });
        // button has disabled attribute
        expect(wrapper.attributes('disabled')).toBe('disabled');
        // button has title
        expect(wrapper.attributes('title')).toEqual(title);
        // button has icon
        expect(wrapper.contains(RIcon)).toBe(true);
    });

    it('renders props.msg when passed', () => {
        const msg = 'Apply';
        const wrapper = shallowMount(RButton, {
            propsData: {msg},
        });
        expect(wrapper.text()).toMatch(msg);
    });

    it('should render via SSR and match snapshot', async () => {
        const msg = 'Apply';
        const wrapper = await renderToString(RButton, {
            propsData: {msg},
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

        expect(wrapper.classes()).toContain('r-button-type-danger');
    });

    it('should render component with size, fluid or disabled prop', () => {
        const wrapper = shallowMount(RButton, {
            propsData: {
                size: 'small',
                disabled: true,
                fluid: true,
            },
            slots: {
                badge: '<strong>small button</strong>',
            },
        });

        expect(wrapper.classes()).toContain('r-button-size-small');
        expect(wrapper.classes()).toContain('r-button-fluid');
        expect(wrapper.attributes().disabled).not.toBe(undefined);
    });
});
