import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {boolean, select, text} from '@storybook/addon-knobs';
import markdown from './r-icon-button.md';
import RIconButton from './r-icon-button.vue';

storiesOf('Refactored.Icon Button', module)
    .addParameters({component: RIconButton})
    .add('Icon Button', () => ({
        props: {
            type: {
                default: select('type', {
                    default: 'default',
                    primary: 'primary',
                    danger: 'danger',
                }, 'primary'),
            },
            size: {
                default: select('size', {
                    small: 'small',
                    regular: 'regular',
                    large: 'large',
                }, 'regular'),
            },
            disabled: {
                default: boolean('disabled', false),
            },
            fluid: {
                default: boolean('fluid', false),
            },
            tooltip: {
                default: text('tooltip', 'move on me, will appear tooltip!'),
            },
            fitted: {
                default: boolean('fitted', false),
            },
            tooltipRightEdge: {
                default: boolean('tooltipRightEdge', false),
            },
        },
        methods: {
            click: action('click'),
            focus: action('focus'),
            blur: action('blur'),
        },
        template: `
            <div class="storybook-center">
                <r-icon-button
                    :type="type"
                    :size="size"
                    :disabled="disabled"
                    :fluid="fluid"
                    :tooltip="tooltip"
                    :fitted="fitted"
                    :tooltipRightEdge="tooltipRightEdge"
                    @click="click"
                    @focus="focus"
                    @blur="blur"
                >
                    <r-icon slot="left-icon" icon="heart"/>
                    Icon button
                    <r-icon slot="right-icon" icon="heart"/>
                </r-icon-button>
            </div>
        `,
    }), {
        notes: {markdown},
    });
