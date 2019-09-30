import {shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RTimePicker from './r-time-picker.vue';

describe('r-time-picker.vue', () => {
    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RTimePicker, {});

        expect(wrapper).toMatchSnapshot();
    });

    it('should not render if show property is false', () => {
        const wrapper = shallowMount(RTimePicker, {});

        expect(wrapper).toMatchSnapshot();
    });
});