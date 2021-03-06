import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {
    array, boolean, number, select, text,
} from '@storybook/addon-knobs';
import axios from 'axios';
import {validationMixin} from 'vuelidate';
import {required, helpers} from 'vuelidate/lib/validators';
import markdown from './r-select.md';
import RSelect from './r-select.vue';
import {validate} from '../../../.storybook/knobs';

storiesOf('Components.Select', module)
    .addParameters({component: RSelect})
    .add('Component', () => ({
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
                default: boolean('Disabled', false, 'State'),
            },
            validate: {
                default: select('validate', validate, null, 'State'),
            },
            helpText: {
                default: text('Help Text', 'Help text for select', 'Text'),
            },
            hideSelected: {
                default: boolean('Hide selected', false),
            },
            internalSearch: {
                default: boolean('Internal Search', true),
            },
            label: {
                default: text('Label', 'Label for select', 'Text'),
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
                default: text('Placeholder', 'Select option', 'Text'),
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
        template: `
            <div class="storybook-center">
                <div style="width: 300px;">
                    <p>Selected: {{ value }}</p>
                    <r-select
                        v-model="value"
                        :allowEmpty="allowEmpty"
                        :clearOnSelect="clearOnSelect"
                        :closeOnSelect="closeOnSelect"
                        :disabled="disabled"
                        :validate="validate"
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
                        @tag="tag"/>
                </div>
            </div>
        `,
    }), {
        notes: {markdown},
    })
    .add('Object options', () => ({
        data() {
            return {
                value: 'test',
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
            validate: {
                default: select('validate', validate, null, 'State'),
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
                default: boolean('Multiple', false),
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
                default: array('Options', [{
                    label: 'Days', value: 'day',
                }, {
                    label: 'Weeks', value: 'week',
                }, {
                    label: 'Months', value: 'month',
                }, {
                    label: 'Years', value: 'year',
                }]),
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
                default: boolean('Taggable', false),
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
        template: `
            <div class="storybook-center">
                <div style="width: 300px;">
                    <p>Selected: {{ value }}</p>
                    <r-select
                        v-model="value"
                        :allowEmpty="allowEmpty"
                        :clearOnSelect="clearOnSelect"
                        :closeOnSelect="closeOnSelect"
                        :validate="validate"
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
                        @tag="tag"/>
                </div>
            </div>
        `,
    }), {
        notes: {markdown},
    })
    .add('Async data', () => ({
        data() {
            return {
                options: [],
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
                default: number('Limit', 4),
            },
            loading: {
                default: boolean('Loading', true),
            },
            max: {
                default: number('Max', 8),
            },
            maxHeight: {
                default: number('Max height', 500),
            },
            multiple: {
                default: boolean('Multiple', false),
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
            optionLabel: {
                default: text('Property to display', 'label'),
            },
            optionKey: {
                default: text('Property to save', 'value'),
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
                default: boolean('Taggable', false),
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
            async asyncFind(search = '') {
                await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}&limit=1`);
                await new Promise(res => setTimeout(res, 1000));
                return ['John', 'Adam', 'Sarah'];
            },
            asyncGetInitValue() {
                return [];
            },
        },
        template: `
            <div class="storybook-center">
                <div style="width: 300px;">
                    <p>Selected: {{ value }}</p>
                    <r-select
                        v-model="value"
                        :asyncFind="asyncFind"
                        :asyncGetInitValue="asyncGetInitValue"
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
                        :optionLabel="optionLabel"
                        :optionKey="optionKey"
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
                        @tag="tag"/>
                </div>
            </div>
        `,
    }), {
        notes: {markdown},
    })
    .add('Validation', () => ({
        data() {
            return {
                value: [],
                options: [{
                    label: 'Cat',
                    value: 'cat',
                }, {
                    label: 'Doge',
                    value: 'doge',
                }, {
                    label: 'Hamster',
                    value: 'hamster',
                }, {
                    label: 'Chair',
                    value: 'chair',
                }],
            };
        },
        props: {
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
            select: action('select'),
            tag: action('tag'),
        },
        computed: {
            label() {
                return `Select only pets: ${this.$v.$invalid ? 'invalid' : 'valid'}`;
            },
        },
        mixins: [validationMixin],
        validations: {
            value: {
                required,
                pet: helpers.regex('alpha', /(cat|hamster|doge)/),
            },
        },
        template: `
            <div class="storybook-center">
                <div style="width: 300px;">
                    <p>Selected: {{ value }}</p>
                    <r-select
                        v-model="value"
                        :label="label"
                        :taggable="true"
                        :options="options"
                        :validate="$v.value"
                        @select="select"
                        @tag="tag"/>
                </div>
            </div>
        `,
    }), {
        notes: {markdown},
    });
