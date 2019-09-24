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
            titleActions: {
                default: boolean('Show title actions', true),
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
                <template v-slot:titleActions v-if="titleActions">
                    <r-button type="link">Title Action</r-button>
                </template>
                <template v-slot:contents>
                    <div v-content>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac lorem enim. Nullam id iaculis diam, quis mollis elit. Phasellus imperdiet sapien eu felis interdum facilisis.</p>
                    </div>
                    <div v-content>
                        <p>Cras at varius turpis. Nulla vestibulum ullamcorper elit quis efficitur. Vestibulum quis luctus nisl. Sed feugiat varius metus, id dignissim mi ultrices eu.</p>
                    </div>
                    <div v-content.secondary>
                        <p>Nam sit amet risus et sem suscipit volutpat sed mattis eros. Suspendisse accumsan hendrerit metus at elementum.</p>
                    </div>
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
