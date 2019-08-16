import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {text, select, boolean} from '@storybook/addon-knobs';
import RRadio from './r-radio.vue';
import markdown from './r-radio.md';

storiesOf('Components/radio', module)
    .add('Radio group', () => ({
        components: {RRadio},
        template: `
            <div>
                <h2>Billing Schedule</h2>
                <r-radio
                    class="stack-s"
                    label="Forever (until canceled)"
                    :model="recurringInterval"
                    @update="update"
                    value="forever"/>
                <r-radio
                    class="stack-s"
                    label="Limited to XX periods"
                    :model="recurringInterval"
                    @update="update"
                    value="limited"/>
                <r-radio
                    class="stack-s"
                    label="Never (one-time sale)"
                    :model="recurringInterval"
                    @update="update"
                    value="never"/>
            </div>
        `,
        methods: {
            update: action('update'),
        },
        props: {},
        data: () => ({
            recurringInterval: '',
        }),
    }), {
        notes: {markdown},
    })
    .add('Radio props', () => ({
        components: {RRadio},
        template: `
            <r-radio
                    class="stack-s"
                    :model="recurringInterval"
                    :label="label"
                    :caption="caption"
                    :disabled="disabled"
                    @update="update"
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
