import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {number} from '@storybook/addon-knobs';
import RPagination from './r-pagination.vue';
import markdown from './r-pagination.md';

storiesOf('Components', module)
    .add('Pagination', () => ({
        components: {RPagination},
        template: `
        <div>
            <r-pagination :provider="provider" 
                          :total="total" 
                          :totalVisible="totalVisible"
                          :limit="limit"
                          @navigate="navigate"></r-pagination>
        </div>
        `,
        methods: {
            navigate: action('navigate'),
            provider() {
            },
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
    });
