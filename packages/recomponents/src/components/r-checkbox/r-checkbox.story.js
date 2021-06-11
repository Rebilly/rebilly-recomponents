import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import markdown from './r-checkbox.md';
import RCheckbox from './r-checkbox.vue';

storiesOf('Components.Checkbox', module)
  .addParameters({ component: RCheckbox })
  .add('Component', () => ({
    data: () => ({
      checkboxModel: null,
    }),
    props: {
      label: { default: text('Label', 'Here is the label') },
      caption: { default: text('Caption', 'Caption is trying to explain something') },
      fuzzy: { default: boolean('Fuzzy', false) },
      disabled: { default: boolean('Disabled', false) },
    },
    methods: {
      input: action('input'),
    },
    template: `
            <div class="storybook-center">
                <r-checkbox
                    :label="label"
                    :caption='caption'
                    :value='true'
                    :fuzzy="fuzzy"
                    :disabled="disabled"
                    v-model="checkboxModel"
                    @input="input"/>
            </div>
        `,
  }), {
    notes: { markdown },
  })
  .add('Multiple checkboxes', () => ({
    data: () => ({
      checkboxModel: [],
      options: [
        { value: '1', label: 'label 1' },
        { value: '2', label: 'label 2' },
      ],
    }),
    template: `
            <div class="storybook-center">
                <r-checkbox
                    v-for="o in options"
                    v-model="checkboxModel"
                    :label="o.label"
                    :value='o.value'/>
            </div>
        `,
  }), {
    notes: { markdown },
  });
