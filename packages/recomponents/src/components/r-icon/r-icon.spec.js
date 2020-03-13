import {shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RIcon from './r-icon.vue';

describe('r-icon.vue', () => {
    it('should render Wrapper and match snapshot', () => {
        const wrapper = shallowMount(RIcon, {
            propsData: {icon: 'user'},
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = await renderToString(RIcon, {
            propsData: {icon: 'user'},
        });

        expect(wrapper).toMatchSnapshot();
    });
});
