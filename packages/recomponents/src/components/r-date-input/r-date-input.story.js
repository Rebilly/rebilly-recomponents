import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {select} from '@storybook/addon-knobs';
import RDateInput from './r-date-input.vue';
import markdown from './r-date-input.md';

storiesOf('Components/DateInput', module)
    .add('Date', () => ({
        props: {
            type: {
                default: select(
                    'type',
                    {
                        date: 'date',
                        datetime: 'datetime',
                        time: 'time',
                    },
                    'date',
                ),
            },
        },
        data: () => ({
            date: null,
        }),
        methods: {
            input: action('input'),
        },
        components: {RDateInput},
        template: `<r-date-input :type="type"  v-model="date" @input="input"/>`,
    }), {
        notes: {markdown},
    });
