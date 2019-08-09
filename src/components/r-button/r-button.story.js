import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { text, select, boolean } from '@storybook/addon-knobs';
import component from './r-button.vue';
import markdown from './r-button.md';

storiesOf('Components', module)
    .add('Button', () => ({
        components: { component },
        template: `
            <component
                :size="size"
                :type="type"
                :disabled="disabled"
                @click="click"
                @focus="focus"
                @blur="blur"
            >
                {{text}}
            </component>
        `,
        methods: {
            click: action('click'),
            focus: action('focus'),
            blur: action('blur'),
        },
        props: {
            size: {
                default: select('Size', {
                    Small: 'small',
                    Regular: 'regular',
                    Large: 'large',
                }, 'regular')
            },
            type: {
                default: select('Type', {
                    Default: 'default',
                    Primary: 'primary',
                    Warning: 'warning',
                    Danger: 'danger',
                }, 'primary')
            },
            text: {
                default: text('Text', 'Click me')
            },
            disabled: {
                default: boolean('Disabled', false),
            }
        },
    }), {
        notes: { markdown },
    });
