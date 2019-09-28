import {shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RTabs from './r-tabs.vue';
import RTab from './r-tab.vue';

describe('r-tabs.vue', () => {
    it('should render Wrapper and match snapshot', () => {
        const wrapper = shallowMount(RTabs);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RTabs);

        expect(wrapper).toMatchSnapshot();
    });

    it('should set a class if the props are set', async () => {
        const wrapper = shallowMount(RTabs, {
            components: {RTab},
            props: {
                menuClass: 'test',
                contentClass: 'test',
            },
            slots: {
                default: renderToString(RTab, {props: {name: 'test1'}, slots: {default: '<p>Test 1</p>'}}),
            },
        });

        expect(wrapper.find('.tab.test')).not.toBe(undefined);
        expect(wrapper.find('.tab-content.test')).not.toBe(undefined);
    });
});
