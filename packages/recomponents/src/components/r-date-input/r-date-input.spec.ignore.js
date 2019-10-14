import {shallowMount} from '@vue/test-utils';

// TODO: Not sure why appeared: SyntaxError: Invalid or unexpected token, so ignore this test.
import RDateInput from './r-date-input.vue';

describe('r-date-input.vue', () => {
    it('should renders date without hours/minutes', () => {
        const wrapper = shallowMount(RDateInput, {
            propsData: {
                type: 'date',
            },
        });
        expect(wrapper.classes()).not.toContain('r-date-time-divider');
    });
});
