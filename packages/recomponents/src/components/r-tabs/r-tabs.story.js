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
                        :tabHeaderMode="true"
                        @tab-selected="tabSelected"
                >
                    <r-tab v-for="(tab, tabIndex) in contentlessTabs"
                            :key="tabIndex"
                            :name="tab.name"
                    />
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
            contentlessTabs: [
                {name: 'Contentless 1'},
                {name: 'Contentless 2'},
                {name: 'Contentless 3'},
            ],
        }),
    }), {
        notes: {markdown},
    });
