import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {boolean, select, text} from '@storybook/addon-knobs';
import StoryRouter from 'storybook-vue-router';

import markdown from './r-button.md';
import RButton from './r-button.vue';


storiesOf('Refactored.Button', module)
    .addParameters({component: RButton})
    .add('Component', () => ({
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
            href: {
                default: text('href', 'https://google.com/'),
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
                :href="href"
                @click="click"
                @focus="focus"
                @blur="blur"
            >
                {{text}}
            </r-button>`,
    }), {
        notes: {markdown},
    })
    .add('Type', () => ({
        template: `
            <div class="r-grid">
                <div class="r-grid-item">
                    <r-button type="default">Default</r-button>
                    <r-button type="primary">Primary</r-button>
                    <r-button type="danger">Danger</r-button>
                    <r-button type="link">Link</r-button>
                </div>
            </div>
        `,
    }), {
        notes: {markdown},
    })
    .add('Size', () => ({
        template: `
            <div class="r-grid">
                <div class="r-grid-item">
                    <r-button type="default" size="small">Small</r-button>
                    <r-button type="default" size="regular">Regular</r-button>
                    <r-button type="default" size="large">Large</r-button>
                </div>
                <div class="r-grid-item">
                    <r-button type="primary" size="small">Small</r-button>
                    <r-button type="primary" size="regular">Regular</r-button>
                    <r-button type="primary" size="large">Large</r-button>
                </div>
            </div>
        `,
    }), {
        notes: {markdown},
    });
