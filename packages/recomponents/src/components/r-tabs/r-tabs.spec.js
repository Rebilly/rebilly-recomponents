import {shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RTabs from './r-tabs.vue';

describe('r-tabs.vue', () => {
    it('should render Wrapper and match snapshot', () => {
        const wrapper = shallowMount(RTabs);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RTabs);

        expect(wrapper).toMatchSnapshot();
    });
});
