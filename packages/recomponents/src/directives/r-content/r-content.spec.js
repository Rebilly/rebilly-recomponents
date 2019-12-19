import {shallowMount} from '@vue/test-utils';

const mockTemplate = {
    template: `
                <div>
                    <div class="r-component-content">
                        <section v-content>
                            <p>Text</p>
                        </section>
                        <section v-content.secondary>
                            <p>Text</p>
                        </section>
                    </div>
                </div>`,
};

const wrapper = shallowMount(mockTemplate);

describe('r-content.js', () => {
    it('Should render the correct HTML structure', () => {
        expect(wrapper.html()).toBe('<div><div class="r-component-content"><section class="r-component-content-is-primary"><p>Text</p></section> <section class="r-component-content-is-secondary"><p>Text</p></section></div></div>');
    });

    it('Should generate the correct primary class', () => {
        expect(wrapper.contains('.r-component-content-is-primary')).toBe(true);
    });

    it('Should generate the correct secondary class', () => {
        expect(wrapper.contains('.r-component-content-is-secondary')).toBe(true);
    });
});
