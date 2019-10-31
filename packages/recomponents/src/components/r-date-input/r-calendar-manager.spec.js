import {shallowMount} from '@vue/test-utils';
import RCalendarManager from './r-calendar-manager.vue';
import RInput from '../r-input/r-input.vue';

describe('r-calendar-manager.vue', () => {
    it('renders default state correctly', () => {
        const wrapper = shallowMount(RCalendarManager, {
            stubs: ['no-ssr'],
        });
        expect(wrapper.find(RInput).attributes('style')).toBe('display: none;');
    });

    it('renders disabled state correctly', () => {
        const wrapper = shallowMount(RCalendarManager, {
            propsData: {
                disabled: true,
            },
            stubs: ['no-ssr'],
        });
        expect(wrapper.contains(RInput)).toBe(true);
        expect(wrapper.find(RInput).attributes('style')).toBe(undefined);
    });
});
