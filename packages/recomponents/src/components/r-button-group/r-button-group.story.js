import {storiesOf} from '@storybook/vue';
import {boolean} from '@storybook/addon-knobs';
import markdown from './r-button-group.md';
import RButtonGroup from './r-button-group.vue';

storiesOf('Components.Button Group', module)
    .addParameters({component: RButtonGroup})
    .add('Component', () => ({
        data: () => ({
            list: ['one', 'two', 'three', 'four', 'five'],
            current: 0,
        }),
        props: {
            fluid: {
                default: boolean('fluid', false),
            },
        },
        template: `
            <div class="storybook-center">
                <r-button-group :fluid="fluid">
                    <r-button
                        :active="current == index"
                        @click="current = index"
                        v-for="(v,index) in list">
                        {{v}}
                    </r-button>
                </r-button-group>
            </div>
        `,
    }), {
        notes: {markdown},
    });
