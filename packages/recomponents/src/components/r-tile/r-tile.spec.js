import {shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RTile from './r-tile.vue';

describe('r-tile.vue', () => {
    it('should render Wrapper and match snapshot', () => {
        const wrapper = shallowMount(RTile);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RTile);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render title', () => {
        const wrapper = shallowMount(RTile, {
            slots: {
                title: '<h2>This is a title</h2>',
            },
        });
        expect(wrapper.find('.r-tile__title').exists()).toBeTruthy();
    });

    it('should render title actions', () => {
        const wrapper = shallowMount(RTile, {
            slots: {
                title: '<h2>This is a title</h2>',
                titleActions: '<a>Link</a>',
            },
        });
        expect(wrapper.find('.r-tile__title--actions').exists()).toBeTruthy();
    });

    it('should not render title actions when title slot is not present', () => {
        const wrapper = shallowMount(RTile, {
            slots: {
                titleActions: '<a>Link</a>',
            },
        });
        expect(wrapper.isEmpty()).toBe(false);
    });

    it('should render contents', () => {
        const wrapper = shallowMount(RTile, {
            slots: {
                contents: '<p>Content</p>',
            },
        });
        expect(wrapper.find('.r-tile__content').exists()).toBeTruthy();
    });

    it('should render actions', () => {
        const wrapper = shallowMount(RTile, {
            slots: {
                actions: '<a>Link</a>',
            },
        });
        expect(wrapper.find('.r-tile__actions').exists()).toBeTruthy();
    });

    it('should not contain any props', () => {
        const {props} = RTile;

        expect(props).toBeUndefined();
    });
});
