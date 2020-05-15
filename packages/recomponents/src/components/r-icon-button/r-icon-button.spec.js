import {renderToString} from '@vue/server-test-utils';
import {shallowMount} from '@vue/test-utils';
import RIconButton from './r-icon-button.vue';

describe('r-icon-button.vue', () => {
    it('should render via SSR and match snapshot', async () => {
        const wrapper = await renderToString(RIconButton, {});

        expect(wrapper).toMatchSnapshot();
    });

    it('should render component with capitalizing the first letter', async () => {
        const wrapper = shallowMount(RIconButton, {
            slots: {
                default: 'click me',
            },
        });

        expect(wrapper.text()).toMatch('Click me');
    });
});
