import {shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RTimePicker from './r-time-picker.vue';

describe('r-time-picker.vue', () => {
    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RTimePicker, {
            mocks: {
                $t: () => {
                },
            },
            propsData: {
                id: 'id',
            },
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should render Wrapper and match snapshot', () => {
        const wrapper = shallowMount(RTimePicker, {
            mocks: {
                $t: () => {
                },
            },
            propsData: {
                id: 'id',
            },
        });

        expect(wrapper).toMatchSnapshot();
    });
});
