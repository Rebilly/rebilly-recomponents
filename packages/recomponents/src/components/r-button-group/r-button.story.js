import {storiesOf} from '@storybook/vue';
import {boolean} from '@storybook/addon-knobs';
import markdown from './r-button-group.md';

storiesOf('Components/Button', module)
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
    });
