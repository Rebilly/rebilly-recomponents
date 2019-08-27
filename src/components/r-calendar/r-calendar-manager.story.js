import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {select} from '@storybook/addon-knobs';
import RCalendarManager from './r-calendar-manager.vue';
import markdown from './r-calendar-manager.md';

import 'v-calendar/lib/v-calendar.min.css';

storiesOf('Components/Date', module)
    .add('r-calendar-manager', () => ({
        props: {
            type: {
                default: select('type', {
                    calendar: 'calendar',
                    range: 'range',
                }, 'calendar'),
            },

        },
        methods: {
            input: action('periodChange'),
        },
        components: {RCalendarManager},
        data: () => ({
        }),
        template: `<r-calendar-manager :type="type" @input="input" :value="null"/>`,
    }), {
        notes: {markdown},
    });
