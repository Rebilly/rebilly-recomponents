import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
// import {text, boolean} from '@storybook/addon-knobs';
import RTimePicker from './r-time-picker.vue';
import markdown from './r-time-picker.md';

storiesOf('Components', module)
    .add('Time Picker', () => ({
        components: {RTimePicker},
        template: `
            <r-time-picker></r-time-picker>
        `,
        methods: {
            update: action('update'),
        },
        props: {},
        data: () => ({}),
    }), {
        notes: {markdown},
    });