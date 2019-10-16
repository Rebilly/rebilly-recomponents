import {shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RPagination from './r-pagination.vue';

describe('r-pagination.vue', () => {
    it('should render Wrapper and match snapshot', () => {
        const wrapper = shallowMount(RPagination, {
            mocks: {
                $t: () => {
                },
            },
            propsData: {
                provider: () => {
                },
                total: 10,
                limit: 5,
            },
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RPagination, {
            mocks: {
                $t: () => {
                },
            },
            propsData: {
                provider: () => {
                },
                total: 10,
                limit: 5,
            },
        });

        expect(wrapper).toMatchSnapshot();
    });
});