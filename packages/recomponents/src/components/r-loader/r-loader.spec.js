import {shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RLoader from './r-loader.vue';

describe('r-loader.vue', () => {
    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RLoader, {
            propsData: {
                show: true,
            },
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should not render if show property is false', () => {
        const wrapper = shallowMount(RLoader, {
            propsData: {
                show: false,
            },
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should render component with classes', () => {
        const wrapper = shallowMount(RLoader, {
            propsData: {
                show: true,
                loading: true,
                fullscreen: true,
            },
        });

        expect(wrapper.classes()).toContain('r-loader--is-loading');
        expect(wrapper.classes()).toContain('r-loader--fullscreen');
    });

    it('should match all incoming props types', () => {
        const {show, loading, fullscreen} = RLoader.props;

        expect(show.type).toBe(Boolean);
        expect(loading.type).toBe(Boolean);
        expect(fullscreen.type).toBe(Boolean);
    });
});
