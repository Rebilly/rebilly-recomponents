import {shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RSelect from './r-select.vue';

describe('r-select.vue', () => {
    it('should render Wrapper and match snapshot', () => {
        const wrapper = shallowMount(RSelect);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RSelect);

        expect(wrapper).toMatchSnapshot();
    });
});
