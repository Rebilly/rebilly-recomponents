import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {select, boolean} from '@storybook/addon-knobs';
import markdown from './r-icon.md';

import {colors, icons} from '../../../.storybook/knobs';

storiesOf('Components', module)
    .add('Icon', () => ({
        template: `
            <div style="background: white;height: 100px;">
                <r-icon
                    :icon="icon"
                    :stopPropagation="stopPropagation"
                    :color="color"/>
            </div>
        `,
        methods: {
            click: action('click'),
        },
        props: {
            icon: {
                default: select('icon', icons, 'heart'),
            },
            color: {
                default: select('color', colors, null),
            },
            stopPropagation: {
                default: boolean('stopPropagation', false),
            },
        },
    }), {
        notes: {markdown},
    });
