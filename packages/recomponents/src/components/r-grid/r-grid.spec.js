import {mount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RGrid from './r-grid.vue';

const provider = async () => [
    {id: 1, name: 'One', type: 'Odd'},
    {id: 2, name: 'Two', type: ['Even', 'Prime']},
    {
        id: 3, name: 'Three', type: ['Odd', 'Prime'], ignore: 'IGNORED',
    },
];

const columns = {
    columns: [
        {
            name: 'id',
            renderAs: 'numeric',
        },
        {
            name: 'name',
            style: {
                minWidth: '300px',
                textAlign: 'center',
            },
            renderAs: 'text',
        },
        {
            name: 'type',
            renderAs: 'badge',
            renderOptions: {
                type: 'negative',
            },
        },
    ],
};

describe('r-grid.vue', () => {
    it('should render Wrapper and match snapshot', () => {
        const wrapper = mount(RGrid, {
            propsData: {provider, columns},
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', () => {
        const wrapper = renderToString(RGrid, {
            propsData: {provider, columns},
        });

        expect(wrapper).toMatchSnapshot();
    });
});
