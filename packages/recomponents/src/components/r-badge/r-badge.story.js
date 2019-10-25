import {storiesOf} from '@storybook/vue';
import {text, select, boolean} from '@storybook/addon-knobs';
import markdown from './r-badge.md';
import {action} from '@storybook/addon-actions';

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
                default: text('Text', 'Click me'),
            },
            close: {
                default: boolean('Close', false),
            }
        },
        methods: {
            closeBadge: action('close'),
        }
    }), {
        notes: {markdown},
    });
