import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {boolean, select, text} from '@storybook/addon-knobs';
import StoryRouter from 'storybook-vue-router';
import markdown from './r-button.md';

storiesOf('Components/Button', module)
    .addDecorator(StoryRouter())
    .add('Button', () => ({
        props: {
            size: {
                default: select('Size', {
                    Small: 'small',
                    Regular: 'regular',
                    Large: 'large',
                }, 'regular'),
            },
            type: {
                default: select('Type', {
                    Default: 'default',
                    Primary: 'primary',
                    Danger: 'danger',
                    Link: 'link',
                }, 'primary'),
            },
            text: {
                default: text('Text', 'Click me'),
            },
            disabled: {
                default: boolean('Disabled', false),
            },
            loading: {
                default: boolean('Loading', false),
            },
            fluid: {
                default: boolean('Fluid', false),
            },
        },
        methods: {
            click: action('click'),
            focus: action('focus'),
            blur: action('blur'),
        },
        template: `<r-button
                :size="size"
                :type="type"
                :fluid="fluid"
                :disabled="disabled"
                :loading="loading"
                @click="click"
                @focus="focus"
                @blur="blur"
            >
                {{text}}
            </r-button>`,
    }), {
        notes: {markdown},
    })
    .add('Button group', () => ({
        props: {
            active: {
                default: boolean('active', false),
            },
            fluid: {
                default: boolean('fluid', false),
            },
        },
        template: `<r-button-group :fluid="fluid">
                        <r-button>One</r-button>
                        <r-button>Two</r-button>
                        <r-button :active="active">Three</r-button>
                        <r-button>Four</r-button>
                    </r-button-group>`,
    }), {
        notes: {markdown},
    })
    .add('Button Link with external link', () => ({
        props: {
            size: {
                default: select('Size', {
                    Small: 'small',
                    Regular: 'regular',
                    Large: 'large',
                }, 'regular'),
            },
            type: {
                default: select('Type', {
                    Default: 'default',
                    Primary: 'primary',
                    Danger: 'danger',
                    Link: 'link',
                }, 'primary'),
            },
            text: {
                default: text('Text', 'Click me'),
            },
            disabled: {
                default: boolean('Disabled', false),
            },
            loading: {
                default: boolean('Loading', false),
            },
            fluid: {
                default: boolean('Fluid', false),
            },
            link: {
                default: text('Link', 'https://google.com/'),
            },
        },
        methods: {
            click: action('click'),
            focus: action('focus'),
            blur: action('blur'),
        },
        template: `<r-button
                    :size="size"
                    :type="type"
                    :disabled="disabled"
                    :href="link"
                    :fluid="fluid"
                    @click="click"
                    @focus="focus"
                    @blur="blur"
                    >
                    {{text}}
                </r-button>`,
    }), {
        notes: {markdown},
    });
