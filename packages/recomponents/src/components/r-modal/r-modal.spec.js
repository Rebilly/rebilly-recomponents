import {renderToString} from '@vue/server-test-utils';
import {shallowMount} from '@vue/test-utils';

import RModal from './r-modal.vue';

describe('r-modal.vue', () => {
    it('should render Wrapper and match snapshot', () => {
        const wrapper = shallowMount(RModal, {
            mocks: {},
            propsData: {},
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RModal, {
            propsData: {},
        });

        expect(wrapper).toMatchSnapshot();
    });

});
