import {createLocalVue, mount} from '@vue/test-utils';

import RButton from '../../components/r-button/r-button.vue';
import RTooltip from './r-tooltip';

const directiveValue = `tooltip-text-${new Date().getTime()}`;

const mockTemplate = {
    template: `<div><r-button v-tooltip="{text: '${directiveValue}'}"><span>Text</span></r-button></div>`,
};

const localVue = createLocalVue();

localVue.component('r-button', RButton);
localVue.directive('tooltip', RTooltip);

describe('r-tooltip.js', () => {
    it('Shouldn render the tooltip', () => {
        const wrapper = mount(mockTemplate, {
            localVue,
            attachToDocument: true,
        });

        expect(document.body.querySelector('.tooltip')).toBe(null);
        wrapper.find('button').trigger('mouseenter');
        expect(document.body.querySelector('.tooltip').outerHTML)
            .toBe('<div class="tooltip tooltip-out-top" style="left: 0px; top: 8px; opacity: 1;"><div class="tooltip-arrow" style="left: 0px;"></div></div>');
        wrapper.destroy();
    });
});
