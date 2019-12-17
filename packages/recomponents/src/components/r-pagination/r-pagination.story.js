import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {number} from '@storybook/addon-knobs';
import markdown from './r-pagination.md';
import RPagination from './r-pagination.vue';

storiesOf('Components/Grid', module)
    .add('Pagination', () => ({
        template: `
            <div class="storybook-center">
                <r-pagination
                    :provider="provider"
                    :total="total"
                    :totalVisible="totalVisible"
                    :limit="limit"
                    @navigate="navigate"/>
            </div>
        `,
        methods: {
            navigate: action('navigate'),
            provider() {},
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
    .add('Example', () => ({
        template: `
            <div class="storybook-center">
                <r-pagination
                    :provider="provider"
                    :total="10"
                    :totalVisible="10"
                    :limit="1"
                    @navigate="navigate"/>
                <r-pagination
                    :provider="provider"
                    :total="100"
                    :totalVisible="1"
                    :limit="1"
                    @navigate="navigate"/>
            </div>
        `,
        methods: {
            navigate: action('navigate'),
            provider() {},
        },
    }), {
        notes: {markdown},
    });
