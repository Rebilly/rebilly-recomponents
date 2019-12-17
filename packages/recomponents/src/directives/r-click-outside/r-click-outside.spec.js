import {mount, createLocalVue} from '@vue/test-utils';
import RButton from '../../components/r-button/r-button.vue';

const mockTemplate = {
    template: `
        <div>
            <r-button id="clickInsideButton" ref="clickInsideButton" @mousedown="clickInsideHandler">Click inside</r-button>
            <r-button id="clickOutsideButton" ref="clickOutsideButton" v-click-outside="clickOutsideHandler">Click outside</r-button>
        </div>
    `,
};

const localVue = createLocalVue();

localVue.component('r-button', RButton);

describe('r-click-outside.js', () => {
    it('Shouldn handle outside click', () => {
        const clickInsideHandler = jest.fn();
        const clickOutsideHandler = jest.fn();

        const wrapper = mount(mockTemplate, {
            localVue,
            attachToDocument: true,
            mocks: {
                clickInsideHandler,
                clickOutsideHandler,
            },
        });

        const clickInsideButton = wrapper.find({ref: 'clickInsideButton'});
        clickInsideButton.trigger('mousedown');

        expect(clickInsideHandler).toHaveBeenCalled();
        expect(clickOutsideHandler).toHaveBeenCalled();

        wrapper.destroy();
    });
});
