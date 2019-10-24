import {storiesOf} from '@storybook/vue';
import {boolean} from '@storybook/addon-knobs';
import markdown from './r-button-group.md';

storiesOf('Components/Button', module)
    .add('Button group', () => ({
        data: () => ({
            list: ['One', 'Two', 'Three', 'Four', 'Five'],
            current: 1,
        }),
        props: {
            active: {
                default: boolean('active', false),
            },
            fluid: {
                default: boolean('fluid', false),
            },
        },
        template: `<r-button-group :fluid="fluid">
                        <r-button 
                            :active="current == index" 
                            @click="current = index" 
                            v-for="(v,index) in list">
                            {{v}}
                        </r-button>
                   </r-button-group>`,
    }), {
        notes: {markdown},
    });
