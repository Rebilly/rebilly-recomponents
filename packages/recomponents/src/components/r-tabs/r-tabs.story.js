import {storiesOf} from '@storybook/vue';
import RTabs from './r-tabs.vue';
import markdown from './r-tabs.md';
import {array} from '@storybook/addon-knobs';

storiesOf('Components', module)
    .add('Tabs', () => ({
        components: {RTabs},
        template: `
            <div>
            <r-tabs></r-tabs>
            
             <r-tabs :divided="true">
                        <r-tab
                            v-for="(tab, tabIndex) in tabs"
                            :key="tabIndex"
                            :name="tab.name">
                        </r-tab>
                    </r-tabs>
            </div>
        `,
        methods: {},
        props: {
            tabs: {
                default: array('Tabs', [
                    {name: 'Tab 1', resource: ''},
                    {name: 'Tab 2', resource: ''},
                    {name: 'Tab 3', resource: ''},
                ], ','),
            },
        },
        data: () => ({}),
    }), {
        notes: {markdown},
    });
