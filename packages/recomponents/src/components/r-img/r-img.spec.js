import {shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RImg from './r-img.vue';

describe('r-img.vue', () => {
    it('renders props.msg when passed', () => {
        const wrapper = shallowMount(RImg, {
            propsData: {
                src: 'https://www.rebilly.com/wp-content/uploads/2019/01/new_features@2x-319x150.png',
            },
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RImg, {
            propsData: {
                src: 'https://www.rebilly.com/wp-content/uploads/2019/01/new_features@2x-319x150.png',
            },
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should trigger load and error events', async () => {
        const wrapper = shallowMount(RImg, {
            propsData: {
                src: 'https://www.rebilly.com/wp-content/uploads/2019/01/new_features@2x-319x150.png',
            },
        });

        wrapper.vm.onload();
        wrapper.vm.onerror();

        expect(wrapper.emitted().onload).toBeTruthy();
        expect(wrapper.emitted().error).toBeTruthy();
    });

    it('shouldn render data-url attribute if lazy is true', async () => {
        const src = 'https://www.rebilly.com/wp-content/uploads/2019/01/new_features@2x-319x150.png';
        const wrapper = shallowMount(RImg, {
            propsData: {
                src,
                lazy: true,
            },
        });
        expect(wrapper.find('img').attributes('data-url')).toBe(src);
    });
});
