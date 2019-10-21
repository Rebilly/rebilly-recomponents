import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {text, boolean} from '@storybook/addon-knobs';
import markdown from './r-radio.md';

storiesOf('Components/Radio', module)
    .add('Radio group', () => ({
        template: `
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
    })
    .add('Radio props', () => ({
        template: `
            <r-radio
                    class="stack-s"
                    v-model="recurringInterval"
                    :label="label"
                    :caption="caption"
                    :disabled="disabled"
                    value="forever"/>
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
    });
