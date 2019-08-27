import {storiesOf} from '@storybook/vue';
import {text, select} from '@storybook/addon-knobs';
import markdown from './r-badge.md';
import RBadge from './r-badge.vue';

storiesOf('Components', module)
    .add('Badge', () => ({
        components: {RBadge},
        template: `
        <r-badge
            :type="type"
        >
            {{text}}
        </r-badge>
    `,
        props: {
            type: {
                default: select('Type', ['default', 'positive', 'negative', 'warning', 'info']),
            },
            text: {
                default: text('Text', 'Click me'),
            },
        },
    }), {
        notes: {markdown},
    });
