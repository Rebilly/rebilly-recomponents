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

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RBadge, {
            slots: {
                default: '<strong>default message</strong>',
            },
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should validate all incoming props', () => {
        const {type} = RBadge.props;

        expect(type.validator('default')).toBeTruthy();
        expect(type.validator('positive')).toBeTruthy();
        expect(type.validator('negative')).toBeTruthy();
        expect(type.validator('warning')).toBeTruthy();
        expect(type.validator('info')).toBeTruthy();
        expect(type.validator('tag')).toBeTruthy();
        expect(type.validator('impossible')).toBeFalsy();
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

        expect(wrapper.classes()).toContain('r-badge--type-warning');
    });
});
