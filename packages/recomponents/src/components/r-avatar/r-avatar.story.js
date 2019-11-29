import {storiesOf} from '@storybook/vue';
import {text, select} from '@storybook/addon-knobs';
import markdown from './r-avatar.md';

import {icons} from '../../../.storybook/knobs';

storiesOf('Components', module)
    .add('Avatar', () => ({
        template: `
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
        `,
        props: {
            initials: {
                default: text('Initials', 'VP', 'Text'),
            },
            descriptionSlot: {
                default: text('Description as slot', `<p>Some Text</p>\n<p class="avatar-info-muted-text">Some Text</p>`, 'Text'),
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
        notes: {markdown},
        knobs: {
            escapeHTML: false,
        },
    });
