import {mount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RWebcomponent from './r-webcomponent.vue';

describe('r-webcomponent.vue', () => {
    it('should render Wrapper and match snapshot', async () => {
        const wrapper = mount(RWebcomponent, {
            slots: {
                default: '<strong>default button</strong>',
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RWebcomponent, {
            slots: {
                default: '<strong>default button</strong>',
            },
        });

        expect(wrapper).toMatchSnapshot();
    });
});
