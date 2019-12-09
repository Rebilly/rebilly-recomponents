import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {boolean} from '@storybook/addon-knobs';
import markdown from './r-tile.md';
import RTile from './r-tile.vue';

storiesOf('Refactored.Tile', module)
    .addParameters({component: RTile})
    .add('Component', () => ({
        props: {
            title: {
                default: boolean('Show title', true),
            },
            titleActions: {
                default: boolean('Show title actions', true),
            },
            actions: {
                default: boolean('Show actions', true),
            },
        },
        methods: {
            cancel: action('cancel'),
            confirm: action('confirm'),
            titleAction: action('titleAction'),
        },
        template: `
            <r-tile>
                <template v-slot:title v-if="title">
                    <h2>Title title</h2>
                </template>
                <template v-slot:titleActions v-if="titleActions">
                    <r-button type="link" @click="titleAction">Title Action</r-button>
                </template>
                <template v-slot:contents>
                    <section v-content>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac lorem enim. Nullam id iaculis diam, quis mollis elit. Phasellus imperdiet sapien eu felis interdum facilisis.</p>
                    </section>
                    <section v-content>
                        <p>Cras at varius turpis. Nulla vestibulum ullamcorper elit quis efficitur. Vestibulum quis luctus nisl. Sed feugiat varius metus, id dignissim mi ultrices eu.</p>
                    </section>
                    <section v-content.secondary>
                        <p>Nam sit amet risus et sem suscipit volutpat sed mattis eros. Suspendisse accumsan hendrerit metus at elementum.</p>
                    </section>
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
