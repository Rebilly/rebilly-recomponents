import {shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RPagination from './r-pagination.vue';

describe('r-pagination.vue', () => {
    it('should render Wrapper and match snapshot', () => {
        const wrapper = shallowMount(RPagination, {
            propsData: {
                provider: () => {
                },
                total: 10,
                limit: 5,
            },
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RPagination, {
            propsData: {
                provider: () => {
                },
                total: 10,
                limit: 5,
            },
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should enable hasPagination property when limit < total', () => {
        const wrapper = shallowMount(RPagination, {
            propsData: {
                provider: () => {
                },
                total: 10,
                limit: 5,
            },
        });

        expect(wrapper.vm.hasPagination).toEqual(true);
    });

    it('should disable hasPagination property when limit < total', () => {
        const wrapper = shallowMount(RPagination, {
            propsData: {
                provider: () => {
                },
                total: 3,
                limit: 5,
            },
        });

        expect(wrapper.vm.hasPagination).toEqual(false);
    });

    it('pages count correctly when total/limit < 1.5', () => {
        const wrapper = shallowMount(RPagination, {
            propsData: {
                provider: () => {
                },
                total: 5,
                limit: 4,
            },
        });

        expect(wrapper.vm.pages).toEqual(2);
    });

    it('pages count correctly when total/limit > 1.5', () => {
        const wrapper = shallowMount(RPagination, {
            propsData: {
                provider: () => {
                },
                total: 5,
                limit: 2,
            },
        });

        expect(wrapper.vm.pages).toEqual(3);
    });

    it('hasNext property correctly', () => {
        const wrapper = shallowMount(RPagination, {
            propsData: {
                provider: () => {
                },
                total: 5,
                limit: 2,
            },
        });

        expect(wrapper.vm.hasNext).toEqual(true);
        wrapper.setData({page: 3});
        expect(wrapper.vm.hasNext).toEqual(false);
    });

    it('hasPrevious property correctly', () => {
        const wrapper = shallowMount(RPagination, {
            propsData: {
                provider: () => {
                },
                total: 5,
                limit: 2,
            },
        });

        expect(wrapper.vm.hasPrevious).toEqual(false);
        wrapper.setData({page: 3});
        expect(wrapper.vm.hasPrevious).toEqual(true);
    });

    it('items property correctly', () => {
        const wrapper = shallowMount(RPagination, {
            propsData: {
                provider: () => {
                },
                total: 100,
                limit: 10,
                totalVisible: 5,
            },
        });

        const getVisible = (items) => Object.values(items).map(({content}) => content);
        expect(getVisible(wrapper.vm.items)).toEqual([1, 2, 3, 4, 5, undefined]);
        wrapper.setData({page: 5});
        expect(getVisible(wrapper.vm.items)).toEqual([undefined, 3, 4, 5, 6, 7, undefined]);
        wrapper.setData({page: 10});
        expect(getVisible(wrapper.vm.items)).toEqual([undefined, 6, 7, 8, 9, 10]);
    });
});
