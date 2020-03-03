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
            numberOfOptions: {default: number('Number of options', 2)},
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
            duration: {
                default: select('Duration', {
                    ' 0.2': 0.2,
                    ' 0.5': 0.5,
                    '1.0': 1,
                    '2.0': 2,
                    '3.0': 3,
                }, 0.2),
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
                        :duration="duration"
                        @input="input"
                        @setActivePopper="setActivePopper"
                        @toggle="toggle"
                        @toggle-on="toggleOn"
                        @toggle-off="toggleOff">
                    <template #trigger="scope">
                        <r-icon-button :disabled="disabled" @click="scope.popper.toggle">
                            <r-icon icon="actions"/>
                        </r-icon-button>
                    </template>
                    <template #content>
                        <div class="r-popover">
                            <div class="r-popover-control">
                                <div class="r-popover-content r-popover-menu r-is-scrollable">
                                    <a class="r-popover-menu-item" v-for="i in numberOfOptions">
                                        Option #{{ i }}
                                    </a>
                                </div>
                                <div class="r-popover-content r-popover-content-padded">
                                    <r-button size="small"
                                              :fluid="true"
                                              class="stack-s">
                                        Action
                                    </r-button>
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
            duration: {
                default: select('Duration', {
                    ' 0.2': 0.2,
                    ' 0.5': 0.5,
                    '1.0': 1,
                    '2.0': 2,
                    '3.0': 3,
                }, 0.2),
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
                        :duration="duration"
                        @input="input"
                        @setActivePopper="setActivePopper"
                        @toggle="toggle"
                        @toggle-on="toggleOn"
                        @toggle-off="toggleOff">
                    <template #trigger="scope">
                        <r-button :disabled="disabled" type="primary" @click="scope.popper.toggle">
                            Click me
                        </r-button>
                    </template>
                    <template #content>
                        <div class="r-popover">
                            <div class="r-popover-control">
                                <div class="r-popover-content r-popover-menu">
                                    <a class="r-popover-menu-item">
                                        Reset to Default Columns
                                    </a>
                                    <a class="r-popover-menu-item">
                                        Reset to Default Order
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
    });
