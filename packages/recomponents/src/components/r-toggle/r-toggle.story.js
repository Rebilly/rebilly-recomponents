import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {boolean, text} from '@storybook/addon-knobs';

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
        data: () => ({
            model: false,
        }),
        template: `
            <div class="storybook-center">
                <r-toggle
                    v-model="model"
                    :label="label"
                    :name="name"
                    :disabled="disabled"
                    :value="true"
                    @change="change"/>
                <p>Toggle value: {{model}}</p>
            </div>
        `,
    }), {
        notes: {markdown},
    })
    .add('Multiple toggles', () => ({
        data: () => ({
            toggleModel: [],
            options: [
                {value: '1', label: 'label 1'},
                {value: '2', label: 'label 2'},
            ],
        }),
        template: `
            <div class="storybook-center">
                <r-toggle
                    v-for="option in options"
                    v-model="toggleModel"
                    :label="option.label"
                />
            </div>
        `,
    }), {
        notes: {markdown},
    });
