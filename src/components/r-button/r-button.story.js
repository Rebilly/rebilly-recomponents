import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-vue-router';
import RButton from './r-button.vue';
import markdown from './r-button.md';

storiesOf('Components/Button', module)
  .addDecorator(StoryRouter())
  .add('Button', () => ({
    props: {
      size: {
        default: select('Size', {
          Small: 'small',
          Regular: 'regular',
          Large: 'large',
        }, 'regular'),
      },
      type: {
        default: select('Type', {
          Default: 'default',
          Primary: 'primary',
          Warning: 'warning',
          Danger: 'danger',
        }, 'primary'),
      },
      text: {
        default: text('Text', 'Click me'),
      },
      disabled: {
        default: boolean('Disabled', false),
      },
      loading: {
        default: boolean('Disabled', false),
      },
      fluid: {
        default: boolean('Fluid', false),
      },
    },
    methods: {
      click: action('click'),
      focus: action('focus'),
      blur: action('blur'),
    },
    components: { RButton },
    template: `<r-button
                :size="size"
                :type="type"
                :disabled="disabled"
                @click="click"
                @focus="focus"
                @blur="blur"
            >
                {{text}}
            </r-button>`,
  }), {
    notes: { markdown },
  })
  .add('Button Link with external link', () => ({
    props: {
      size: {
        default: select('Size', {
          Small: 'small',
          Regular: 'regular',
          Large: 'large',
        }, 'regular'),
      },
      type: {
        default: select('Type', {
          Default: 'default',
          Primary: 'primary',
          Warning: 'warning',
          Danger: 'danger',
        }, 'primary'),
      },
      text: {
        default: text('Text', 'Click me'),
      },
      disabled: {
        default: boolean('Disabled', false),
      },
      loading: {
        default: boolean('Disabled', false),
      },
      fluid: {
        default: boolean('Fluid', false),
      },
      link: {
        default: text('Link', 'https://google.com/'),
      },
    },
    methods: {
      click: action('click'),
      focus: action('focus'),
      blur: action('blur'),
    },
    components: { RButton },
    template: `<r-button
                    :size="size"
                    :type="type"
                    :disabled="disabled"
                    :href="link"
                    @click="click"
                    @focus="focus"
                    @blur="blur"
                    >
                    {{text}}
                </r-button>`,
  }), {
    notes: { markdown },
  })
  .add('Button Link with routing', () => ({
    props: {
      size: {
        default: select('Size', {
          Small: 'small',
          Regular: 'regular',
          Large: 'large',
        }, 'regular'),
      },
      type: {
        default: select('Type', {
          Default: 'default',
          Primary: 'primary',
          Warning: 'warning',
          Danger: 'danger',
        }, 'primary'),
      },
      text: {
        default: text('Text', 'Click me'),
      },
      disabled: {
        default: boolean('Disabled', false),
      },
      loading: {
        default: boolean('Disabled', false),
      },
      fluid: {
        default: boolean('Fluid', false),
      },
      push: {
        default: text('Push', 'test'),
      },
    },
    methods: {
      click: action('click'),
      focus: action('focus'),
      blur: action('blur'),
    },
    components: { RButton },
    template: `<r-button
                    :size="size"
                    :type="type"
                    :disabled="disabled"
                    :push="{path: push}"
                    @click="click"
                    @focus="focus"
                    @blur="blur"
                    >
                    {{text}}
                </r-button>`,
  }), {
    notes: { markdown },
  });
