import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {boolean, text} from '@storybook/addon-knobs';
import RCheckbox from './r-checkbox.vue';
import markdown from './r-checkbox.md';

storiesOf('Components', module)
    .add('Checkbox', () => ({
        data: () => ({
            checkboxModel: null,
            value: true,
            selected: [],
        }),
        props: {
            label: {default: text('Label', 'Here is the label')},
            caption: {default: text('Caption', '')},
            fuzzy: {default: boolean('Fuzzy', false)},
            disabled: {default: boolean('Disabled', false)},
        },
        methods: {
            input: action('input'),
        },
        components: {RCheckbox},
        template: `<r-checkbox
                        :caption='caption'
                        :value='value'
                        :label="label"
                        :disabled="disabled"
                        :fuzzy="fuzzy"
                        v-model="checkboxModel"
                        @input="input"/>`,
    }), {
        notes: {markdown},
    });
