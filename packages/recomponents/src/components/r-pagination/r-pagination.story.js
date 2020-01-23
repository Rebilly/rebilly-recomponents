import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {number} from '@storybook/addon-knobs';
import markdown from './r-pagination.md';
import RPagination from './r-pagination.vue';

storiesOf('Components.Pagination', module)
    .addParameters({component: RPagination})
    .add('Component', () => ({
        template: `
            <div class="storybook-center">
                <r-pagination
                    :provider="provider"
                    :total="total"
                    :totalVisible="totalVisible"
                    :limit="limit"
                    v-model="page"
                    @navigate="navigate"/>
            </div>
        `,
        methods: {
            navigate: action('navigate'),
            provider() {},
        },
        data() {
            return {
                page: 1,
            };
        },
        props: {
            total: {
                default: number('Total', 100),
            },
            limit: {
                default: number('Limit', 10),
            },
            totalVisible: {
                default: number('Total visible', 5),
            },
        },
    }), {
        notes: {markdown},
    })
    .add('Custom first page', () => ({
        template: `
            <div class="storybook-center">
                <h2>Page #1</h2>
                <r-pagination
                    :provider="provider"
                    :total="10"
                    :totalVisible="10"
                    :limit="1"
                    v-model="pagination1"
                    @navigate="navigate"/>
                <h2>Page #5</h2>
                <r-pagination
                    :provider="provider"
                    :total="100"
                    :totalVisible="1"
                    :limit="1"
                    v-model="pagination2"
                    @navigate="navigate"/>
                <h2>Page #10</h2>
                <r-pagination
                    :provider="provider"
                    :total="100"
                    :totalVisible="1"
                    :limit="1"
                    v-model="pagination3"
                    @navigate="navigate"/>
            </div>
        `,
        data() {
            return {
                pagination1: 1,
                pagination2: 5,
                pagination3: 10,
            };
        },
        methods: {
            navigate: action('navigate'),
            provider() {},
        },
    }), {
        notes: {markdown},
    })
    .add('Update from parent', () => ({
        template: `
            <div class="storybook-center">
                <r-input
                    numeric
                    placeholder="Type here"
                    helpText="This field is connected to pagination"
                    label="Enter page number"
                    @input="input"
                    :value="page"
                    />
                <r-pagination
                    :provider="provider"
                    :total="10"
                    :totalVisible="10"
                    :limit="1"
                    v-model="page"
                    @navigate="navigate"/>
            </div>
        `,
        data() {
            return {
                page: 1,
            };
        },
        methods: {
            navigate: action('navigate'),
            provider() {},
            input(value) {
                this.page = parseInt(value, 10);
            },
        },
    }), {
        notes: {markdown},
    });
