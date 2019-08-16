import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {boolean, select, text} from '@storybook/addon-knobs';
import RLoader from './r-loader.vue';
import markdown from './r-loader.md';

storiesOf('Components', module)
    .add('Loader', () => ({
        components: {RLoader},
        props: {
            show: {
                default: boolean('Show', true),
            },
            loading: {
                default: boolean('Loading', true),
            },
        },
        template: `<r-loader :show="show" :loading="loading"/>`,
    }), {
        notes: {markdown},
    });
