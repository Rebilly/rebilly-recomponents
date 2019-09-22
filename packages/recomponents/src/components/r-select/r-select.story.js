import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {array, boolean, number, select, text} from '@storybook/addon-knobs';
import RSelect from './r-select.vue';
import markdown from './r-select.md';

storiesOf('Components', module)
    .add('Select', () => ({
        components: {RSelect},
        data() {
            return {
                value: null,
            };
        },
        props: {
            label: {
                default: text('Label', 'Label for select'),
            },
            helpText: {
                default: text('Help Text', 'Help text for select'),
            },
            options: {
                default: array('Options', ['Days', 'Weeks', 'Months', 'Years']),
            },
            multiple: {
                default: boolean('Multiple', true),
            },
            limit: {
                default: number('Limit', 2),
            },
            maxHeight: {
                default: number('Max height', 40),
            },
            loading: {
                default: boolean('Loading', false),
            },
            disabled: {
                default: boolean('Disabled', false),
            },
            openDirection: {
                default: select('Direction', {
                    Top: 'top',
                    Above: 'above',
                    Bottom: 'bottom',
                    Below: 'below',
                    Auto: '',
                }, ''),
            },
            showNoOptions: {
                default: boolean('Show \"No options\"', true),
            },
            showNoResults: {
                default: boolean('Show \"No results\"', true),
            },
            internalSearch: {
                default: boolean('Internal Search', true),
            },
            // trackBy: {
            //     type: String,
            // },
            searchable: {
                default: boolean('Searchable', true),
            },
            clearOnSelect: {
                default: boolean('Clear on select', true),
            },
            hideSelected: {
                default: boolean('Hide selected', false),
            },
            placeholder: {
                default: text('Placeholder', 'Select option'),
            },
            allowEmpty: {
                default: boolean('Allow empty', true),
            },
            resetAfter: {
                default: boolean('Reset after', false),
            },
            closeOnSelect: {
                default: boolean('Close on select', true),
            },
            taggable: {
                default: boolean('Taggable', true),
            },
            tagPlaceholder: {
                default: text('Tag placeholder', 'Press enter to create a tag'),
            },
            tagPosition: {
                default: select('Tag position', {top: 'top'}, 'top'),
            },
            // max: {
            //     type: [Number, Boolean],
            //     default: false,
            // },
            optionsLimit: {
                default: number('Options limit', 1000),
            },
            // groupValues: {
            //     type: String,
            // },
            // groupLabel: {
            //     type: String,
            // },
            groupSelect: {
                default: boolean('Group select', false),
            },
            // blockKeys: {
            //     type: Array,
            //     default() {
            //         return [];
            //     },
            // },
            preserveSearch: {
                default: boolean('Preserve search', false),

            },
            preselectFirst: {
                default: boolean('Preselect first', true),

            },
        },
        methods: {
            input: action('input'),
            select: action('select'),
            tag: action('tag'),
            remove: action('remove'),
            searchChange: action('searchChange'),
            open: action('open'),
            close: action('close'),
        },
        template: `<div>
                       <p>Selected: {{ value }}</p>
                       <r-select
                           :label="label"
                           :helpText="helpText"
                           :limit="limit"
                           :maxHeight="maxHeight"
                           :loading="loading"
                           :disabled="disabled"
                           :openDirection="openDirection"
                           :showNoOptions="showNoOptions"
                           :showNoResults="showNoResults"
                           :value="value"
                           :options="options"
                           :internalSearch="internalSearch"
                           :searchable="searchable"
                           :clearOnSelect="clearOnSelect"
                           :hideSelected="hideSelected"
                           :placeholder="placeholder"
                           :allowEmpty="allowEmpty"
                           :resetAfter="resetAfter"
                           :closeOnSelect="closeOnSelect"
                           :taggable="taggable"
                           :tagPlaceholder="tagPlaceholder"
                           :tagPosition="tagPosition"
                           :optionsLimit="optionsLimit"
                           :groupSelect="groupSelect"
                           :preserveSearch="preserveSearch"
                           :preselectFirst="preselectFirst"
                           @input="input" 
                           @select="select"
                           @tag="tag"
                           @remove="remove"
                           @search-change="searchChange"
                           @open="open"
                           @close="close">
                       </r-select>
                     </div>
        `,
    }), {
        notes: {markdown},
    });
