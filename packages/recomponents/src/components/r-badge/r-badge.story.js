import {storiesOf} from '@storybook/vue';
import {text, select, boolean} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import markdown from './r-badge.md';

storiesOf('Components', module)
    .add('Badge', () => ({
        template: `
            <r-badge
                :close="close"
                @close="closeBadge"
                :type="type">
                {{text}}
            </r-badge>
        `,
        props: {
            type: {
                default: select('Type', [
                    'default',
                    'positive',
                    'negative',
                    'warning',
                    'info',
                    'tag',
                    'tag-secondary',
                ]),
            },
            text: {
                default: text('Text', 'Badge'),
            },
            close: {
                default: boolean('Close', false),
            },
        },
        methods: {
            closeBadge: action('close'),
        },
    }), {
        notes: {markdown},
    });
