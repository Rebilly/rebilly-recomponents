import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { text, select, boolean } from '@storybook/addon-knobs';
import RInput from './r-input.vue';
import markdown from './r-input.md';

storiesOf('Components', module)
  .add('Input', () => ({
    components: { RInput },
    template: `
            <r-input :label="label" 
                :disabled="disabled"
                v-model="model"
                :placeholder="placeholder"
                :helpText="helpText"
                :multiline="multiline"
                :submitOnEnter="submitOnEnter"
                :leftIcon="leftIcon"
                />
        `,
    methods: {
      click: action('click'),
      focus: action('focus'),
      blur: action('blur'),
    },
    props: {
        label: {
            default: text('label', 'Label'),
        },
        disabled: {
            default: boolean('disabled', false),
        },
        model: {
            default: text('model', 'value here'),
        },
        placeholder: {
            default: text('placeholder', 'Please input value here'),
        },
        helpText: {
            default: text('helpText', 'Help text here to explain something'),
        },
        multiline: {
            default: boolean('multiline', false),
        },
        submitOnEnter: {
            default: boolean('submitOnEnter', false),
        },
        leftIcon: {
            default: select('leftIcon', ['', 'search','customers','lock','burger'], ''),
        },
    },
  }), {
    notes: { markdown },
  });
