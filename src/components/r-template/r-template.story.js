import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import RTemplate from './r-template.vue';
import markdown from './r-template.md';

storiesOf('Components', module)
    .add('Template', () => ({
        components: { RTemplate },
        template: `
            <r-template
                :show="show"
                :text="text"
                @close="onClose"
            />
        `,
        methods: {
            onClose: action('onClose'),
        },
        props: {
            show: {
                default: boolean('Show', true)
            },
            text: {
                default: text('Text', 'Here is external message')
            }
        },
    }), {
        notes: { markdown },
    });
