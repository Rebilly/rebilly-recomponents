import {createLocalVue, shallowMount} from '@vue/test-utils';
import RContent from './r-content';

const mockTemplate = {
    template: `
                <div>
                    <div class="r-component__content">
                        <section v-content>
                            <p>Text</p>
                        </section>
                        <section v-content.secondary>
                            <p>Text</p>
                        </section> 
                    </div>
                </div>`,
};

const localVue = createLocalVue();
localVue.directive('content', RContent);

const wrapper = shallowMount(mockTemplate, {
    localVue,
});

describe('r-content.js', () => {
    it('Should render the correct HTML structure', () => {
        expect(wrapper.html()).toBe('<div><div class="r-component__content"><section class="r-component__content--primary"><p>Text</p></section> <section class="r-component__content--secondary"><p>Text</p></section></div></div>');
    });

    it('Should generate the correct primary class', () => {
        expect(wrapper.contains('.r-component__content--primary')).toBe(true);
    });

    it('Should generate the correct secondary class', () => {
        expect(wrapper.contains('.r-component__content--secondary')).toBe(true);
    });
});
