import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {boolean, text} from '@storybook/addon-knobs';
import moment from 'moment';
import RTimePicker from './r-time-picker.vue';
import markdown from './r-time-picker.md';

storiesOf('Components/Time Picker', module)
    .add('Single Time Picker', () => ({
        components: {RTimePicker},
        template: `
            <r-time-picker :label="label"
                           :disabled="disabled"
                           :placeholder="placeholder"
                           :helpText="helpText"
                           :period="period"
                           v-model="time"
                           @input="input"
                           @close="close"
                           @open="open"
                           @remove="remove"
                           @select="select"></r-time-picker>
        `,
        methods: {
            input: action('input'),
            close: action('close'),
            open: action('open'),
            remove: action('remove'),
            select: action('select'),
        },
        props: {
            label: {
                default: text('Label', ''),
            },
            disabled: {
                default: boolean('Disabled', false),
            },
            placeholder: {
                default: text('Placeholder', ''),
            },
            helpText: {
                default: text('Help text', ''),
            },
        },
        data() {
            return {
                time: moment().toISOString(),
            };
        },
    }), {
        notes: {markdown},
    })
    .add('Time Range', () => ({
        components: {RTimePicker},
        template: `
        <div class="r-time-range">
           <r-time-picker :label="startLabel"
                          :disabled="disabled"
                          :placeholder="placeholder"
                          :helpText="startHelpText"
                          v-model="time.start"
                          @input="input"
                          @close="close"
                          @open="open"
                          @remove="remove"
                          @select="select"></r-time-picker>
           <r-time-picker :label="endLabel"
                          :disabled="disabled"
                          :placeholder="placeholder"
                          :helpText="endHelpText"
                          v-model="time.end"
                          @input="input"
                          @close="close"
                          @open="open"
                          @remove="remove"
                          @select="select"></r-time-picker>
        </div>`,
        methods: {
            input: action('input'),
            close: action('close'),
            open: action('open'),
            remove: action('remove'),
            select: action('select'),
        },
        props: {
            startLabel: {
                default: text('Label for the first time picker', 'Start'),
            },
            endLabel: {
                default: text('Label for the second time picker', 'End'),
            },
            disabled: {
                default: boolean('Disabled', false),
            },
            placeholder: {
                default: text('Placeholder', ''),
            },
            startHelpText: {
                default: text('Help text for the first TP', 'Choose the start time please here'),
            },
            endHelpText: {
                default: text('Help text for the second TP', '...and end time'),
            },
        },
        data() {
            return {
                time: {
                    start: '2019-07-28T00:58:33+00:00',
                    end: moment().toISOString(),
                },
            };
        },
    }), {
        notes: {markdown},
    });
