import {storiesOf} from '@storybook/vue';
import {boolean, text} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import markdown from './r-tabs.md';

storiesOf('Components', module)
    .add('Tabs', () => ({
        template: `
            <div>
                <r-tabs :divided="divided"
                        :menuClass="menuClass"
                        :contentClass="contentClass"
                        :tabHeaderMode="tabHeaderMode"
                        @tab-selected="tabSelected"
                >
                    <r-tab v-for="(tab, tabIndex) in tabs"
                            :key="tabIndex"
                            :name="tab.name"
                    >
                        <template v-if="!tabHeaderMode">
                            {{tab.content}}
                        </template>
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
            tabHeaderMode: {
                default: boolean('Tab Header Mode', false),
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
                {name: 'Tab 1', content: 'Tab 1 Content'},
                {name: 'Tab 2', content: 'Tab 2 Content'},
                {name: 'Tab 3', content: 'Tab 3 Content'},
            ],
        }),
    }), {
        notes: {markdown},
    });
