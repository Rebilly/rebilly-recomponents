import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {
    array, boolean, number, select, text,
} from '@storybook/addon-knobs';
import axios from 'axios';
import markdown from './r-select.md';

storiesOf('Components/Select', module)
    .add('Select', () => ({
        data() {
            return {
                value: null,
            };
        },
        props: {
            allowEmpty: {
                default: boolean('Allow empty', true),
            },
            clearOnSelect: {
                default: boolean('Clear on select', true),
            },
            closeOnSelect: {
                default: boolean('Close on select', true),
            },
            disabled: {
                default: boolean('Disabled', false),
            },
            helpText: {
                default: text('Help Text', 'Help text for select'),
            },
            hideSelected: {
                default: boolean('Hide selected', false),
            },
            internalSearch: {
                default: boolean('Internal Search', true),
            },
            label: {
                default: text('Label', 'Label for select'),
            },
            limit: {
                default: number('Limit', 2),
            },
            loading: {
                default: boolean('Loading', false),
            },
            max: {
                default: number('Max', 2),
            },
            maxHeight: {
                default: number('Max height', 500),
            },
            multiple: {
                default: boolean('Multiple', true),
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
            options: {
                default: array('Options', ['Days', 'Weeks', 'Months', 'Years']),
            },
            optionsLimit: {
                default: number('Options limit', 1000),
            },
            placeholder: {
                default: text('Placeholder', 'Select option'),
            },
            preselectFirst: {
                default: boolean('Preselect first', true),

            },
            preserveSearch: {
                default: boolean('Preserve search', false),

            },
            resetAfter: {
                default: boolean('Reset after', false),
            },
            searchable: {
                default: boolean('Searchable', true),
            },
            showNoOptions: {
                default: boolean(`Show "No options"`, true),
            },
            showNoResults: {
                default: boolean(`Show "No results"`, true),
            },
            tagPlaceholder: {
                default: text('Tag placeholder', 'Press enter to create a tag'),
            },
            tagPosition: {
                default: select('Tag position', {top: 'top', bottom: 'bottom'}, 'top'),
            },
            taggable: {
                default: boolean('Taggable', true),
            },
        },
        methods: {
            close: action('close'),
            input: action('input'),
            open: action('open'),
            remove: action('remove'),
            searchChange: action('searchChange'),
            select: action('select'),
            tag: action('tag'),
        },
        template: `<div>
                       <p>Selected: {{ value }}</p>
                       <r-select
                            v-model="value"
                            :allowEmpty="allowEmpty"
                            :clearOnSelect="clearOnSelect"
                            :closeOnSelect="closeOnSelect"
                            :disabled="disabled"
                            :helpText="helpText"
                            :hideSelected="hideSelected"
                            :internalSearch="internalSearch"
                            :label="label"
                            :limit="limit"
                            :loading="loading"
                            :max="max"
                            :maxHeight="maxHeight"
                            :multiple="multiple"
                            :openDirection="openDirection"
                            :options="options"
                            :optionsLimit="optionsLimit"
                            :placeholder="placeholder"
                            :preselectFirst="preselectFirst"
                            :preserveSearch="preserveSearch"
                            :resetAfter="resetAfter"
                            :searchable="searchable"
                            :showNoOptions="showNoOptions"
                            :showNoResults="showNoResults"
                            :tagPlaceholder="tagPlaceholder"
                            :tagPosition="tagPosition"
                            :taggable="taggable"
                            @close="close"
                            @input="input"
                            @open="open"
                            @remove="remove"
                            @search-change="searchChange"
                            @select="select"
                            @tag="tag">
                       </r-select>
                     </div>
        `,
    }), {
        notes: {markdown},
    }).add('Select with async loading data', () => ({
        data() {
            return {
                loading: false,
                options: [],
                value: null,
            };
        },
        props: {
            async: {
                default: text('GET Request URL', 'https://jsonplaceholder.typicode.com/todos'),
            },
            allowEmpty: {
                default: boolean('Allow empty', true),
            },
            clearOnSelect: {
                default: boolean('Clear on select', true),
            },
            closeOnSelect: {
                default: boolean('Close on select', true),
            },
            disabled: {
                default: boolean('Disabled', false),
            },
            helpText: {
                default: text('Help Text', 'Help text for select'),
            },
            hideSelected: {
                default: boolean('Hide selected', false),
            },
            internalSearch: {
                default: boolean('Internal Search', true),
            },
            label: {
                default: text('Label', 'Label for select'),
            },
            limit: {
                default: number('Limit', 4),
            },
            max: {
                default: number('Max', 8),
            },
            maxHeight: {
                default: number('Max height', 500),
            },
            multiple: {
                default: boolean('Multiple', true),
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
            optionsLimit: {
                default: number('Options limit', 1000),
            },
            placeholder: {
                default: text('Placeholder', 'Select option'),
            },
            preselectFirst: {
                default: boolean('Preselect first', true),

            },
            preserveSearch: {
                default: boolean('Preserve search', false),

            },
            propLabel: {
                default: text('Property to display', 'title'),
            },
            resetAfter: {
                default: boolean('Reset after', false),
            },
            searchable: {
                default: boolean('Searchable', true),
            },
            showNoOptions: {
                default: boolean(`Show "No options"`, true),
            },
            showNoResults: {
                default: boolean(`Show "No results"`, true),
            },
            tagPlaceholder: {
                default: text('Tag placeholder', 'Press enter to create a tag'),
            },
            tagPosition: {
                default: select('Tag position', {top: 'top', bottom: 'bottom'}, 'top'),
            },
            taggable: {
                default: boolean('Taggable', true),
            },
        },
        methods: {
            close: action('close'),
            input: action('input'),
            open: action('open'),
            remove: action('remove'),
            searchChange: action('searchChange'),
            select: action('select'),
            tag: action('tag'),
        },
        mounted() {
            this.loading = true;
            axios.get(this.async)
                .then((response) => {
                    setTimeout(() => {
                        this.options = response.data;
                        this.loading = false;
                    }, 2000);
                });
        },
        template: `<div>
                       <p>Selected: {{ value }}</p>
                       <r-select
                            v-model="value"
                            :allowEmpty="allowEmpty"
                            :clearOnSelect="clearOnSelect"
                            :closeOnSelect="closeOnSelect"
                            :disabled="disabled"
                            :helpText="helpText"
                            :hideSelected="hideSelected"
                            :internalSearch="internalSearch"
                            :label="label"
                            :limit="limit"
                            :loading="loading"
                            :max="max"
                            :maxHeight="maxHeight"
                            :multiple="multiple"
                            :openDirection="openDirection"
                            :options="options"
                            :optionsLimit="optionsLimit"
                            :propLabel="propLabel"
                            :placeholder="placeholder"
                            :preselectFirst="preselectFirst"
                            :preserveSearch="preserveSearch"
                            :resetAfter="resetAfter"
                            :searchable="searchable"
                            :showNoOptions="showNoOptions"
                            :showNoResults="showNoResults"
                            :tagPlaceholder="tagPlaceholder"
                            :tagPosition="tagPosition"
                            :taggable="taggable"
                            @close="close"
                            @input="input"
                            @open="open"
                            @remove="remove"
                            @search-change="searchChange"
                            @select="select"
                            @tag="tag">
                       </r-select>
                     </div>
        `,
    }), {
        notes: {markdown},
    });
