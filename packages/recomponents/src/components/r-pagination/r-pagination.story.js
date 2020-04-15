import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {boolean, number} from '@storybook/addon-knobs';
import markdown from './r-pagination.md';
import RPagination from './r-pagination.vue';

storiesOf('Components.Pagination', module)
    .addParameters({component: RPagination})
    .add('Component', () => ({
        template: `
            <div class="storybook-center">
                    <r-pagination
                        :total="total"
                        :limit="limit"
                        :offset="offset"
                        :expanded="expanded"
                        :show-pagination="showPagination"
                        @navigate="navigate"
                />
            </div>
        `,
        methods: {
            navigate: action('navigate'),
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
            offset: {
                default: number('Offset', 0),
            },
            showPagination: {
                default: boolean('Show pagination', true),
            },
            expanded: {
                default: boolean('Expanded', false),
            },
        },
    }), {
        notes: {markdown},
    });
