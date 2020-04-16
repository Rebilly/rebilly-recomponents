import {shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RPaginationControl from './r-pagination-control.vue';


describe('r-pagination-control.vue', () => {
    it('should render Wrapper and match snapshot', () => {
        const wrapper = shallowMount(RPaginationControl);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = await renderToString(RPaginationControl);
        expect(wrapper).toMatchSnapshot();
    });

    it('pages count correctly when total/limit < 1.5', () => {
        const wrapper = shallowMount(RPaginationControl, {
            propsData: {
                total: 5,
                limit: 4,
            },
        });

        expect(wrapper.vm.totalPages).toEqual(2);
    });

    it('pages count correctly when total/limit > 1.5', () => {
        const wrapper = shallowMount(RPaginationControl, {
            propsData: {
                total: 5,
                limit: 2,
            },
        });

        expect(wrapper.vm.totalPages).toEqual(3);
    });

    it('hasNext property correctly', () => {
        const wrapper = shallowMount(RPaginationControl, {
            propsData: {
                total: 5,
                limit: 2,
            },
        });

        expect(wrapper.vm.canMoveForward).toEqual(true);
        wrapper.vm.navigate(3);
        expect(wrapper.vm.canMoveForward).toEqual(false);
    });

    it('hasPrevious property correctly', () => {
        const wrapper = shallowMount(RPaginationControl, {
            propsData: {
                total: 5,
                limit: 2,
            },
        });

        expect(wrapper.vm.canMoveBackward).toEqual(false);
        wrapper.vm.navigate(3);
        expect(wrapper.vm.canMoveBackward).toEqual(true);
    });

    it('items property correctly', () => {
        const wrapper = shallowMount(RPaginationControl, {
            propsData: {
                total: 100,
                limit: 10,
                totalVisible: 5,
            },
        });

        const getVisible = items => items.map(({id}) => id);
        expect(getVisible(wrapper.vm.pages)).toEqual([1, 2, 3, 4, 5]);
        wrapper.vm.navigate(5);
        expect(getVisible(wrapper.vm.pages)).toEqual([3, 4, 5, 6, 7]);
        wrapper.vm.navigate(10);
        expect(getVisible(wrapper.vm.pages)).toEqual([6, 7, 8, 9, 10]);
    });
});
