import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {boolean} from '@storybook/addon-knobs';
import RTile from './r-tile.vue';
import RButton from '../r-button/r-button.vue';
import markdown from './r-tile.md';

storiesOf('Components', module)
    .add('Tile', () => ({
        components: {RTile, RButton},
        props: {
            title: {
                default: boolean('Show title', true),
            },
            primary: {
                default: boolean('Show primary', true),
            },
            secondary: {
                default: boolean('Show secondary', true),
            },
            actions: {
                default: boolean('Show actions', true),
            },
        },
        methods: {
            cancel: action('cancel'),
            confirm: action('confirm'),
        },
        template: `
            <r-tile>
                <template v-slot:title v-if="title">
                    <h2>Title title</h2>
                </template>
                <template v-slot:primary v-if="primary">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </template>
                <template v-slot:secondary v-if="secondary">
                    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>
                </template>
                <template v-slot:actions v-if="actions">
                    <r-button type="default" @click="cancel">Cancel</r-button>
                    <r-button type="primary" @click="confirm">Confirm</r-button>
                </template>
            </r-tile>
        `,
    }), {
        notes: {markdown},
    });
