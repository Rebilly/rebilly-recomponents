import {shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import Vue from 'vue';
import RFileUpload from './r-file-upload.vue';

describe('r-file-upload.vue', () => {
    it('should render Wrapper and match snapshot', () => {
        const wrapper = shallowMount(RFileUpload, {
            propsData: {
                multiple: true,
            },
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RFileUpload, {
            propsData: {
                multiple: false,
            },
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should handle input event', async () => {
        const wrapper = shallowMount(RFileUpload, {
            propsData: {
                multiple: true,
            },
        });

        wrapper.vm.input({
            target: {
                files: [],
            },
        });

        expect(wrapper.emitted('input')).toBeTruthy();
        expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('should handle open and close', async () => {
        const wrapper = shallowMount(RFileUpload, {
            propsData: {
                multiple: true,
            },
        });

        wrapper.vm.openFileBrowser();
        wrapper.vm.setFocus();

        await Vue.nextTick();

        expect(wrapper.emitted('cancel')).toBeTruthy();
        expect(wrapper.emitted('close')).toBeTruthy();
    });
});
