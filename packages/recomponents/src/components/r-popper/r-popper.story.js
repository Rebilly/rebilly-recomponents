import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {boolean, number, select} from '@storybook/addon-knobs';
import markdown from './r-popper.md';
import RPopper from './r-popper.vue';

storiesOf('Components.Popper', module)
    .addParameters({component: RPopper})
    .add('With icon button', () => ({
        props: {
            escToHide: {default: boolean('Escape to hide', true)},
            autoHide: {default: boolean('Auto hide', true)},
            globalAutoHide: {default: boolean('Global auto hide', true)},
            openOnMount: {default: boolean('Open on mount', false)},
            disabled: {default: boolean('Disabled', false)},
            offset: {default: number('Offset', 4)},
            direction: {
                default: select('Direction', {
                    Horizontal: 'horizontal',
                    Vertical: 'vertical',
                }, 'horizontal'),
            },
            position: {
                default: select('Position', {
                    'Bottom Start': 'bottomStart',
                    'Bottom End': 'bottomEnd',
                    'Top Start': 'topStart',
                    'Top End': 'topEnd',
                }, 'bottomStart'),
            },
            slideFrom: {
                default: select('Slide from', {
                    Fade: 'fade',
                    Top: 'top',
                    Bottom: 'bottom',
                    Left: 'left',
                    Right: 'right',
                }, 'fade'),
            },
        },
        methods: {
            toggle: action('toggle'),
            toggleOn: action('toggleOn'),
            toggleOff: action('toggleOff'),
            input: action('input'),
            setActivePopper: action('setActivePopper'),
        },
        template: `
            <div class="storybook-center">
                <r-popper
                    :escToHide="escToHide"
                    :autoHide="autoHide"
                    :globalAutoHide="globalAutoHide"
                    :openOnMount="openOnMount"
                    :disabled="disabled"
                    :offset="offset"
                    :direction="direction"
                    :position="position"
                    :slideFrom="slideFrom"
                    @input="input"
                    @setActivePopper="setActivePopper"
                    @toggle="toggle"
                    @toggle-on="toggleOn"
                    @toggle-off="toggleOff">
                    <template #trigger="{popper}">
                    <r-icon-button @click="popper.toggle">
                            <r-icon icon="actions"/>
                    </r-icon-button>
                    </template>
                    <template #content>
                        <div class="r-popover">
                            <div class="r-popover-control">
                                <div class="r-popover-content r-popover-menu">
                                    <a class="r-popover-menu-item">
                                        Edit
                                    </a>
                                    <a class="r-popover-menu-item r-popover-menu-item-negative">
                                    Remove
                                    </a>
                                </div>
                            </div>
                        </div>
                    </template>
                </r-popper>
            </div>
        `,
    }), {
        notes: {markdown},
    })
    .add('With regular button', () => ({
        props: {
            escToHide: {default: boolean('Escape to hide', true)},
            autoHide: {default: boolean('Auto hide', true)},
            globalAutoHide: {default: boolean('Global auto hide', true)},
            openOnMount: {default: boolean('Open on mount', false)},
            disabled: {default: boolean('Disabled', false)},
            offset: {default: number('Offset', 4)},
            direction: {
                default: select('Direction', {
                    Horizontal: 'horizontal',
                    Vertical: 'vertical',
                }, 'horizontal'),
            },
            position: {
                default: select('Position', {
                    'Bottom Start': 'bottomStart',
                    'Bottom End': 'bottomEnd',
                    'Top Start': 'topStart',
                    'Top End': 'topEnd',
                }, 'bottomStart'),
            },
            slideFrom: {
                default: select('Slide from', {
                    Fade: 'fade',
                    Top: 'top',
                    Bottom: 'bottom',
                    Left: 'left',
                    Right: 'right',
                }, 'fade'),
            },
        },
        methods: {
            toggle: action('toggle'),
            toggleOn: action('toggleOn'),
            toggleOff: action('toggleOff'),
            input: action('input'),
            setActivePopper: action('setActivePopper'),
        },
        template: `
            <div class="storybook-center">
                <r-popper
                    :escToHide="escToHide"
                    :autoHide="autoHide"
                    :globalAutoHide="globalAutoHide"
                    :openOnMount="openOnMount"
                    :disabled="disabled"
                    :offset="offset"
                    :direction="direction"
                    :position="position"
                    :slideFrom="slideFrom"
                    @input="input"
                    @setActivePopper="setActivePopper"
                    @toggle="toggle"
                    @toggle-on="toggleOn"
                    @toggle-off="toggleOff">
                    <template #trigger="{popper}">
                        <r-button type="primary" @click="popper.toggle">
                            Click me
                        </r-button>
                    </template>
                    <template #content>
                    <div class="r-dropdown">
                        <div class="r-dropdown-content">
                            <a class="r-dropdown-item">
                                Reset to Default Columns
                            </a>
                        </div>
                        <div class="r-dropdown-content">
                            <a class="r-dropdown-item">
                                Reset to Default Order
                            </a>
                        </div>
                    </div>
                    </template>
                </r-popper>
            </div>
        `,
    }), {
        notes: {markdown},
    });
