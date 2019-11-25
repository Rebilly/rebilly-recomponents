import {storiesOf} from '@storybook/vue';
import {text, select} from '@storybook/addon-knobs';
import markdown from './r-avatar.md';

storiesOf('Components', module)
    .add('Avatar', () => ({
        template: `
            <r-avatar
                :initials="initials"
                :color="color">
                kek
            </r-avatar>
        `,
        props: {
            initials: {
                default: text('Initial', 'VP'),
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
    });
