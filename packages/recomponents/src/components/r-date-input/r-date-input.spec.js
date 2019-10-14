import {mount} from '@vue/test-utils';
import RDateInput from './r-date-input.vue';

describe('r-date-input.vue', () => {
    it('should renders date without hours/minutes', () => {
        const wrapper = mount(RDateInput, {
            propsData: {
                type: 'date',
            },
        });
        expect(wrapper.classes()).not.toContain('r-date-time-divider');
    });
});
