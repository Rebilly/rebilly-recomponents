import { storiesOf } from '@storybook/vue';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import markdown from './r-badge.md';
import RBadge from './r-badge.vue';

storiesOf('Components.Badge', module)
  .addParameters({ component: RBadge })
  .add('Component', () => ({
    template: `
            <div class="storybook-center">
                <r-badge
                    :close="close"
                    @close="closeBadge"
                    :type="type">
                    {{text}}
                </r-badge>
            </div>
        `,
    props: {
      type: {
        default: select('Type', [
          'default',
          'positive',
          'negative',
          'warning',
          'info',
          'tag',
          'tag-secondary',
        ]),
      },
      text: {
        default: text('Text', 'Badge'),
      },
      close: {
        default: boolean('Close', false),
      },
    },
    methods: {
      closeBadge: action('close'),
    },
  }), {
    notes: { markdown },
  })
  .add('All types', () => ({
    template: `
            <div class="storybook-center">
                <div class="storybook-item" v-for="type in types">
                    <r-badge
                        :type="type">
                        {{type}}
                    </r-badge>
                </div>
                <div class="storybook-item">
                    <r-badge
                        type="default"
                        :close="true">
                        with close button
                    </r-badge>
                </div>
            </div>
        `,
    props: {
      types: {
        default: [
          'default',
          'positive',
          'negative',
          'warning',
          'info',
          'tag',
          'tag-secondary',
        ],
      },
    },
  }), {
    notes: { markdown },
  });
