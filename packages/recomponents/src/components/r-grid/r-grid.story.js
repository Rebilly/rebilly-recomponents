import {storiesOf} from '@storybook/vue';
import markdown from './r-grid.md';
import RGrid from './r-grid.vue';

storiesOf('Components/Grid', module)
    .addParameters({component: RGrid})
    .add('Grid', () => ({
            template: `
            <r-pagination :limit="limit" :total="total" @navigate="provider">
                <template #pagination="{pagination}">
                <pre>{{ pagination }}</pre>
                    <r-grid :provider="provider(pagination.offset)" :columns="columns" :key="pagination.offset">
                        <header slot="header">
                            <h1 class="r-mb-l">Numbers</h1>
                        </header>
                        <section slot="empty">
                            <p>No numbers found.</p>
                        </section>
                        <footer slot="footer" v-if="pagination.showPagination">
                            <r-pagination-control :total="pagination.total"
                                                  :limit="pagination.limit"
                                                  :offset="pagination.offset"
                                                  :expanded="true"/>
                        </footer>
                    </r-grid>
                </template>
            </r-pagination>
        `,
            data() {
                return {
                    columns: {
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
                            }, {
                                name: 'money',
                                renderAs: 'numeric',
                                renderOptions: {
                                    currency: 'USD',
                                },
                            },
                            {
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
                    },
                    limit: 3,
                    total: 9,
                    page: 1,
                };
            },
            methods: {
                async provider(offset) {
                    const items = [
                        {
                            id: 1, name: 'One', type: 'Odd', money: 4734, updatedAt: '12/25/2019',
                        },
                        {
                            id: 2, name: 'Two', type: ['Even', 'Prime'], money: 23, updatedAt: '12/25/2019',
                        },
                        {
                            id: 3, name: 'Three', type: ['Odd', 'Prime'], money: 436478326, updatedAt: '12/25/2019',
                        },
                        {
                            id: 4, name: 'Four', type: 'Even', updatedAt: '12/25/2019',
                        },
                        {
                            id: 5, name: 'Five', type: ['Odd', 'Prime'], updatedAt: '12/25/2019',
                        },
                        {
                            id: 6, name: 'Six', type: 'Even', updatedAt: '12/25/2019',
                        },
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

                    return items.slice(offset, offset + this.limit);
                },
            },
        }),
        {
            notes: markdown,
        });