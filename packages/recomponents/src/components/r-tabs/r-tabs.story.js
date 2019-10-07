import {storiesOf} from '@storybook/vue';
import {boolean, text} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import RTabs from './r-tabs.vue';
import RTab from './r-tab.vue';
import RTile from '../r-tile/r-tile.vue';
import RButton from '../r-button/r-button.vue';
import markdown from './r-tabs.md';

storiesOf('Components', module)
    .add('Tabs', () => ({
        components: {
            RTabs, RTab, RTile, RButton,
        },
        template: `
<div>
    <r-tabs :divided="divided"
            :menuClass="menuClass" 
            :contentClass="contentClass" 
            @tab-selected="tabSelected">
            <r-tab v-for="(tab, tabIndex) in tabs"
               :key="tabIndex"
               :name="tab.name">
               <r-tile>
                    <template v-slot:title>
                        <h2>{{ tab.name }}</h2>
                    </template>
                    <template v-slot:contents>
                        <p v-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </template>
                </r-tile>
           </r-tab>     
    </r-tabs>
</div>
        `,
        methods: {
            tabSelected: action('tab-selected'),
        },
        props: {
            divided: {
                default: boolean('Divided', false),
            },
            menuClass: {
                default: text('Menu class', ''),
            },
            contentClass: {
                default: text('Content class', ''),
            },
        },
        data: () => ({
            tabs: [
                {name: 'Tab 1', resource: ''},
                {name: 'Tab 2', resource: ''},
                {name: 'Tab 3', resource: ''},
            ],
        }),
    }), {
        notes: {markdown},
    });
