import {shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RTile from './r-tile.vue';

describe('r-loader.vue', () => {
    it('should render Wrapper and match snapshot', () => {
        const wrapper = shallowMount(RTile);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RTile);

        expect(wrapper).toMatchSnapshot();
    });
});
