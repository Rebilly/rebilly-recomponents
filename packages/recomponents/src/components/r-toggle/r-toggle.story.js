import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {boolean, select, text} from '@storybook/addon-knobs';

import markdown from './r-toggle.md';

storiesOf('Components.Toggle', module)
    .add('Component', () => ({
        props: {
            label: {
                default: text('Label', 'Toggle me'),
            },
            name: {
                default: text('Name', 'toggle'),
            },
            disabled: {
                default: boolean('Disabled', false),
            },
        },
        methods: {
            change: action('change'),
        },
        template: `
            <div class="storybook-center">
                <r-toggle
                    :label="label"
                    :name="name"
                    :disabled="disabled"
                    @change="change"/>
            </div>
        `,
    }), {
        notes: {markdown},
    });
