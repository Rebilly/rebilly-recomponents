import {storiesOf} from '@storybook/vue';
import markdown from './r-grid.md';
import RGrid from './r-grid.vue';

storiesOf('Components/Grid', module)
    .addParameters({component: RGrid})
    .add('Grid', () => ({
        template: `
            <r-pagination :provider="provider" :limit="limit" :total="total">
                <template #pagination="{pagination}">
                    <r-grid :provider="pagination.provider" :columns="columns" :key="pagination.offset">
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
            };
        },
        methods: {
            async provider(page) {
                if (page === 1) {
                    return [
                        {
                            id: 1, name: 'One', type: 'Odd', updatedAt: '12/25/2019',
                        },
                        {
                            id: 2, name: 'Two', type: ['Even', 'Prime'], updatedAt: '12/25/2019',
                        },
                        {
                            id: 3, name: 'Three', type: ['Odd', 'Prime'], updatedAt: '12/25/2019',
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
        },
    }), {
        notes: {markdown},
    });
