import {storiesOf} from '@storybook/vue';
import {boolean, text} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import markdown from './r-tabs.md';
import RTabs from './r-tabs.vue';

storiesOf('Components.Tabs', module)
    .addParameters({component: RTabs})
    .add('Component', () => ({
        template: `
            <div class="storybook-center">
                <r-tabs :divided="divided"
                        :menuClass="menuClass"
                        :contentClass="contentClass"
                        @tab-selected="tabSelected"
                >
                    <r-tab v-for="(tab, tabIndex) in tabs"
                           :key="tabIndex"
                           :name="tab.name"
                    >
                        {{tab.resource}}
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
                {name: 'Tab 1', resource: 'Tab 1 Content'},
                {name: 'Tab 2', resource: 'Tab 2 Content'},
                {name: 'Tab 3', resource: 'Tab 3 Content'},
            ],
        }),
    }), {
        notes: {markdown},
    });
