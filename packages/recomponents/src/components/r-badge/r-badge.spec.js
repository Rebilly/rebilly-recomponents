import {mount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RBadge from './r-badge.vue';

describe('r-badge.vue', () => {
    it('should render Wrapper and match snapshot', async () => {
        const wrapper = mount(RBadge, {
            slots: {
                default: '<strong>default message</strong>',
            },
        });

        expect(wrapper.html())
            .toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RBadge, {
            slots: {
                default: '<strong>default message</strong>',
            },
        });

        expect(wrapper)
            .toMatchSnapshot();
    });

    it('should render component with type prop', () => {
        const wrapper = mount(RBadge, {
            propsData: {
                type: 'warning',
            },
            slots: {
                badge: '<strong>warning message</strong>',
            },
        });

        expect(wrapper.classes())
            .toContain('r-badge--type-warning');
    });
});
