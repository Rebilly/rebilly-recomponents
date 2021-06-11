import { storiesOf } from '@storybook/vue';
import { text, select } from '@storybook/addon-knobs';
import markdown from './r-avatar.md';
import RAvatar from './r-avatar.vue';
import { icons } from '../../../.storybook/knobs';

storiesOf('Components.Avatar', module)
  .addParameters({ component: RAvatar })
  .add('Component', () => ({
    template: `
            <div class="storybook-center">
                <r-avatar
                    :initials="initials"
                    :description="desciptionProp"
                    :image="image"
                    :color="color"
                    :icon="icon">
                    <template v-if="descriptionSlot">
                        <div v-html="descriptionSlot"></div>
                    </template>
                </r-avatar>
            </div>
        `,
    props: {
      initials: {
        default: text('Initials', 'VP', 'Text'),
      },
      descriptionSlot: {
        default: text('Description as slot', '<p>Some Text</p>\n<p class="r-avatar-info-muted-text">Some Text</p>', 'Text'),
      },
      desciptionProp: {
        default: text('Description as prop', '', 'Text'),
      },
      image: {
        default: text('Image', 'https://www.meme-arsenal.com/memes/86b1de6ff6981be012d40bf26c6992ab.jpg'),
      },
      icon: {
        default: select('Icon', icons, null),
      },
      color: {
        default: select('Color', [
          'gray',
          'yellow',
          'green',
          'accent',
          'dark-background',
        ], 'gray'),
      },
    },
    slots: {
      default: 'text',
    },
  }), {
    notes: { markdown },
    knobs: {
      escapeHTML: false,
    },
  })
  .add('All Colors', () => ({
    template: `
            <div class="storybook-center">
                <r-avatar
                    v-for="color in colors"
                    v-tooltip="{text: color}"
                    initials="RB"
                    :color="color"/>
            </div>
        `,
    props: {
      colors: {
        default: [
          'gray',
          'yellow',
          'green',
          'accent',
          'dark-background',
        ],
      },
    },
  }), {
    notes: { markdown },
  })
  .add('Variations', () => ({
    template: `
            <div class="storybook-center">
                <div class="r-grid">
                    <div class="r-grid-item">
                        <r-avatar initials="VP">Initials</r-avatar>
                    </div>
                    <div class="r-grid-item">
                        <r-avatar icon="heart">Icon</r-avatar>
                    </div>
                    <div class="r-grid-item">
                        <r-avatar image="https://www.meme-arsenal.com/memes/86b1de6ff6981be012d40bf26c6992ab.jpg">Image</r-avatar>
                    </div>
                </div>
            </div>
        `,
  }), {
    notes: { markdown },
  });
