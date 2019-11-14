import {storiesOf} from '@storybook/vue';
import markdown from './r-grid.md';

storiesOf('Components/Grid', module)
    .add('Grid', () => ({
        template: `
        <div>
            <r-pagination :provider="provider" :limit="limit" :total="total">
                <template #pagination="{pagination}">
                    <r-grid :provider="pagination.provider" :columns="columns" :key="pagination.offset">
                        <header slot="header">
                            <h2>Numbers</h2>
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
                        {id: 1, name: 'One', type: 'Odd'},
                        {id: 2, name: 'Two', type: ['Even', 'Prime']},
                        {id: 3, name: 'Three', type: ['Odd', 'Prime']},
                    ];
                }
                if (page === 2) {
                    return [
                        {id: 4, name: 'Four', type: 'Even'},
                        {id: 5, name: 'Five', type: ['Odd', 'Prime']},
                        {id: 6, name: 'Six', type: 'Even'},
                    ];
                }
                if (page === 3) {
                    return [
                        {id: 7, name: 'Seven', type: ['Odd', 'Prime']},
                        {id: 8, name: 'Eight', type: 'Even'},
                        {id: 9, name: 'Nine', type: 'Odd'},
                    ];
                }

                return [];
            },
        },
    }), {
        notes: {markdown},
    });
