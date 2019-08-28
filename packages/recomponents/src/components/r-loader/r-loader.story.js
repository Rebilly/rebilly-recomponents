import {storiesOf} from '@storybook/vue';
import {boolean} from '@storybook/addon-knobs';
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
            fullscreen: {
                default: boolean('Fullscreen', false),
            },
        },
        template: `<r-loader :show="show" :loading="loading" :fullscreen="fullscreen"/>`,
    }), {
        notes: {markdown},
    });