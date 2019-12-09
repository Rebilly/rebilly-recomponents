import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {text, boolean} from '@storybook/addon-knobs';
import markdown from './r-radio.md';
import RRadio from './r-radio.vue';

storiesOf('Refactored.Radio', module)
    .addParameters({component: RRadio})
    .add('Component', () => ({
        template: `
            <div class="storybook-center">
                <r-radio
                    class="stack-s"
                    v-model="recurringInterval"
                    :label="label"
                    :caption="caption"
                    :disabled="disabled"
                    value="forever"/>
            </div>
        `,
        methods: {
            update: action('update'),
        },
        props: {
            label: {
                default: text('label', 'Label'),
            },
            caption: {
                default: text('caption', 'Caption here to explain something'),
            },
            disabled: {
                default: boolean('disabled', false),
            },
        },
        data: () => ({
            recurringInterval: '',
        }),
    }), {
        notes: {markdown},
    })
    .add('Group', () => ({
        template: `
            <div class="storybook-center">
                <div role="radiogroup" aria-label="Billing Schedule">
                    <h2>Billing Schedule</h2>
                    <r-radio
                        label="Forever (until canceled)"
                        name="theGroupName"
                        v-model="recurringInterval"
                        value="forever"/>
                    <r-radio
                        label="Limited to XX periods"
                        name="theGroupName"
                        v-model="recurringInterval"
                        value="limited"/>
                    <r-radio
                        label="Never (one-time sale)"
                        name="theGroupName"
                        v-model="recurringInterval"
                        value="never"/>
                    <r-radio
                        disabled
                        label="Disabled"
                        name="theGroupName"
                        v-model="recurringInterval"
                        value="disabled"/>
                </div>
            </div>
        `,
        methods: {
            update: action('update'),
        },
        props: {},
        data: () => ({
            recurringInterval: 'forever',
        }),
    }), {
        notes: {markdown},
    });
