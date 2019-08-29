import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {boolean, text} from '@storybook/addon-knobs';
import RCheckbox from './r-checkbox.vue';
import markdown from './r-checkbox.md';

storiesOf('Components/Checkbox', module)
    .add('1 Checkbox', () => ({
        data: () => ({
            checkboxModel: null,
        }),
        props: {
            label: {default: text('Label', 'Here is the label')},
            caption: {default: text('Caption', 'Caption is trying to explain something')},
            fuzzy: {default: boolean('Fuzzy', false)},
            disabled: {default: boolean('Disabled', false)},
        },
        methods: {
            input: action('input'),
        },
        components: {RCheckbox},
        template: `<r-checkbox
                        :label="label"
                        :caption='caption'
                        :value='true'
                        :fuzzy="fuzzy"
                        :disabled="disabled"
                        v-model="checkboxModel"
                        @input="input"/>`,
    }), {
        notes: {markdown},
    })
    .add('Multiple checkboxes', () => ({
        data: () => ({
            checkboxModel: [],
            options: [
                {value: '1', label: 'label 1'},
                {value: '2', label: 'label 2'},
            ],
        }),
        components: {RCheckbox},
        template: `<div>
                        <r-checkbox
                        v-for="o in options"
                        :label="o.label"
                        :value='o.value'
                        v-model="checkboxModel" />
                    </div>`,
    }), {
        notes: {markdown},
    });
