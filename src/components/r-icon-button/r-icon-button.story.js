import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {boolean, select, text} from '@storybook/addon-knobs';
import RIconButton from './r-icon-button.vue';
import RIcon from '../r-icon/r-icon.vue';
import markdown from './r-icon-button.md';

storiesOf('Components/Button', module)
    .add('Icon Button', () => ({
        props: {
            type: {
                default: select('type', {
                    default: 'default',
                    primary: 'primary',
                    warning: 'warning',
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
        components: {RIconButton, RIcon},
        template: `
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
            </r-icon-button>`,
    }), {
        notes: {markdown},
    });
