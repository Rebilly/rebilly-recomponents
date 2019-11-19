import {shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RPaginationControl from './r-pagination-control.vue';

const makeProvide = ({
    paginationPage = null,
    paginationNext = null,
    paginationPrevious = null,
    paginationOffset = null,
    paginationTotal = null,
    paginationLimit = null,
    paginationItems = null,
    paginationHasNext = null,
    paginationHasPrevious = null,
} = {}) => ({
    paginationPage: () => paginationPage,
    paginationNext: () => paginationNext,
    paginationPrevious: () => paginationPrevious,
    paginationOffset: () => paginationOffset,
    paginationTotal: () => paginationTotal,
    paginationLimit: () => paginationLimit,
    paginationItems: () => paginationItems,
    paginationHasNext: () => paginationHasNext,
    paginationHasPrevious: () => paginationHasPrevious,
});

describe('r-pagination-control.vue', () => {
    it('should render Wrapper and match snapshot', () => {
        const wrapper = shallowMount(RPaginationControl, {
            provide: {...makeProvide()},
        });
        expect(wrapper).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RPaginationControl, {
            provide: {...makeProvide()},
        });
        expect(wrapper).toMatchSnapshot();
    });
});
