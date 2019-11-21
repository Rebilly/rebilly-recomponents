import {renderToString} from '@vue/server-test-utils';
import {shallowMount} from '@vue/test-utils';

import RModal from './r-modal.vue';

describe('r-modal.vue', () => {
    it('should render Wrapper and match snapshot', () => {
        const wrapper = shallowMount(RModal, {
            propsData: {
                size: 'large',
            },
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RModal, {
            propsData: {
                size: 'extra-large',
            },
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should emit all available event destroy', () => {
        const wrapper = shallowMount(RModal, {
            propsData: {
                size: 'fluid',
            },
            slots: {
                content: '<strong>default message</strong>',
            },
        });

        wrapper.vm.submit();
        wrapper.vm.close();
        wrapper.vm.enter();
        wrapper.destroy();
        expect(wrapper.emitted().submit).toBeTruthy();
        expect(wrapper.emitted().close).toBeTruthy();
        expect(wrapper.emitted().enter).toBeTruthy();
        expect(wrapper.emitted().leave).toBeTruthy();
    });
});
