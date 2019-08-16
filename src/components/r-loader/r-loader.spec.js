import {shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RLoader from './r-loader.vue';

describe('r-loader.vue', () => {
    it('renders props.msg when passed', () => {
        const wrapper = shallowMount(RLoader);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RLoader);
        expect(wrapper).toMatchSnapshot();
    });
});
