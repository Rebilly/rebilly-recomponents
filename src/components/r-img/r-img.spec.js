import {shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RImg from './r-img.vue';

describe('r-loader.vue', () => {
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
});
