import {storiesOf} from '@storybook/vue';
import {boolean, number} from '@storybook/addon-knobs';
import markdown from './r-grid.md';
import RGrid from './r-grid.vue';

storiesOf('Components/Grid', module)
    .addParameters({component: RGrid})
    .add('Grid', () => ({
        props: {
            hasFrozenColumn: {default: boolean('With frozen column', false)},
            isLoaderFullscreen: {default: boolean('With fullscreen loader', false)},
            paidColumnDigits: {default: number('Paid column digits', 0)},
        },
        template: `
            <div class="storybook-center r-position-relative" style="background-color: white;">
                <r-pagination :provider="provider" :limit="limit" :total="total" @navigate="setPage" :page="page">
                    <template #pagination="{pagination}">
                        <r-grid :provider="provider(pagination.offset)"
                                :has-frozen-column="hasFrozenColumn" 
                                :is-loader-fullscreen="isLoaderFullscreen" 
                                :columns="columns" 
                                :key="pagination.offset">
                            <header slot="header">
                                <h1 class="r-mb-l">Numbers</h1>
                            </header>
                            <section slot="empty">
                                <p>No numbers found.</p>
                            </section>
                            <footer slot="footer" v-if="pagination.hasPagination">
                                <r-pagination-control/>
                            </footer>
                        </r-grid>
                    </template>
                </r-pagination>
            </div>
        `,
        data() {
            return {
                limit: 3,
                total: 9,
                page: 1,
            };
        },
        computed: {
            columns() {
                return {
                    columns: [
                        {
                            name: 'id',
                            renderAs: 'numeric',
                        },
                        {
                            name: 'name',
                            style: {
                                minWidth: '150px',
                                textAlign: 'center',
                            },
                            renderAs: 'text',
                        }, {
                            name: 'money',
                            renderAs: 'numeric',
                            renderOptions: {
                                currency: 'USD',
                            },
                        }, {
                            name: 'paid',
                            renderAs: 'numeric',
                            renderOptions: {
                                currency: 'USD',
                                currencyDigits: this.paidColumnDigits,
                            },
                        }, {
                            name: 'type',
                            renderAs: 'badge',
                            renderOptions: {
                                type: 'negative',
                            },
                        },
                        {
                            name: 'updatedAt',
                            renderAs: 'date',
                        },
                    ],
                };
            },
        },
        methods: {
            async provider(page) {
                if (page === 1) {
                    return [
                        {
                            id: 1, name: 'One', type: 'Odd', money: 4734, paid: 453.453, updatedAt: '12/25/2019',
                        },
                        {
                            id: 2,
                            name: 'Two',
                            type: ['Even', 'Prime'],
                            money: 23,
                            paid: 453.4534354534,
                            updatedAt: '12/25/2019',
                        },
                        {
                            id: 3,
                            name: 'Three',
                            type: ['Odd', 'Prime'],
                            money: 436478326,
                            paid: 123.23123,
                            updatedAt: '12/25/2019',
                        },
                    ];
                }
                if (page === 2) {
                    return [
                        {
                            id: 4, name: 'Four', type: 'Even', updatedAt: '12/25/2019',
                        },
                        {
                            id: 5, name: 'Five', type: ['Odd', 'Prime'], updatedAt: '12/25/2019',
                        },
                        {
                            id: 6, name: 'Six', type: 'Even', updatedAt: '12/25/2019',
                        },
                    ];
                }
                if (page === 3) {
                    return [
                        {
                            id: 7, name: 'Seven', type: ['Odd', 'Prime'], updatedAt: '12/25/2019',
                        },
                        {
                            id: 8, name: 'Eight', type: 'Even', updatedAt: '12/25/2019',
                        },
                        {
                            id: 9, name: 'Nine', type: 'Odd', updatedAt: '12/25/2019',
                        },
                    ];
                }

                return [];
            },
            setPage(page) {
                this.page = page;
            },
        },
    }), {
        notes: {markdown},
    });
