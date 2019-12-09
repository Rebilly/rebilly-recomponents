import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {select, boolean} from '@storybook/addon-knobs';
import markdown from './r-icon.md';
import RIcon from './r-icon.vue';

import {icons, colors} from '../../../.storybook/knobs';

storiesOf('Refactored.Icon', module)
    .addParameters({component: RIcon})
    .add('Component', () => ({
        template: `
            <div class="storybook-center">
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
            stopPropagation: {
                default: boolean('stopPropagation', false),
            },
            color: {
                default: select('color', colors, null),
            },
        },
    }), {
        notes: {markdown},
    })
    .add('All Icons', () => ({
        template: `
            <div class="storybook-center">
                <r-icon
                    v-for="icon in icons"
                    v-tooltip="{text: icon}"
                    :icon="icon"/>
            </div>
        `,
        props: {
            icons: {
                default: icons,
            },
        },
    }), {
        notes: {markdown},
    })
    .add('All Colors', () => ({
        template: `
            <div class="storybook-center">
                <r-icon
                    v-for="color in colors"
                    v-tooltip="{text: color}"
                    :color="color"
                    icon="info"/>
            </div>
        `,
        props: {
            colors: {
                default: colors,
            },
        },
    }), {
        notes: {markdown},
    });
