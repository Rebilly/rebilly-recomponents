import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {boolean, number, select} from '@storybook/addon-knobs';
import RDropdown from './r-dropdown.vue';
import RIconButton from '../r-icon-button/r-icon-button.vue';
import RIcon from '../r-icon/r-icon.vue';
import RButton from '../r-button/r-button.vue';
import markdown from './r-dropdown.md';

storiesOf('Components/Dropdown', module)
    .add('with icon button', () => ({
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
        components: {RDropdown, RIcon, RIconButton},
        template: `<r-dropdown 
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
                                <div class="popover">
                                    <div class="popover-control">
                                        <div class="popover-content popover-menu">
                                            <a class="popover-menu-item">
                                                Edit
                                            </a>
                                            <a class="popover-menu-item popover-menu-item-negative">
                                               Remove
                                            </a>
                                        </div>
                                    </div>
                                </div>
                           </template>
                   </r-dropdown>`,
    }), {
        notes: {markdown},
    })
    .add('with button', () => ({
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
        components: {RDropdown, RIcon, RButton},
        template: `<r-dropdown 
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
                             <div class="dropdown">
                                <div class="dropdown-content">
                                    <a class="dropdown-item">
                                        Reset to Default Columns
                                    </a>
                                </div>
                                <div class="dropdown-content">
                                    <a class="dropdown-item">
                                        Reset to Default Order
                                    </a>
                                </div>
                             </div>
                           </template>
                   </r-dropdown>`,
    }), {
        notes: {markdown},
    });
