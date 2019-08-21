import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {text} from '@storybook/addon-knobs';
import recomponents from '../components/index';

const {
    RTile, RInput, RCheckbox, RButton,
} = recomponents;

storiesOf('Demo', module)
    .add('Payment Form', () => ({
        components: {
            RTile, RInput, RCheckbox, RButton,
        },
        props: {
            width: {
                default: text('Form width', '400px'),
            },
        },
        methods: {
            submit: action('submit'),
        },
        template: `
            <r-tile :style="{width: width}">
                <template v-slot:title>
                    <h2>Make a payment</h2>
                </template>
                <template v-slot:primary>
                    <p>
                        <r-input
                            placeholder="First name"
                        />
                    </p>
                    <p>
                        <r-input
                            placeholder="Last name"
                        />
                    </p>
                    <p>
                        <r-input
                            placeholder="Email"
                        />
                    </p>
                    <p>
                        <r-input
                            placeholder="Phone"
                        />
                    </p>
                    <p>
                        <r-input
                            placeholder="Credit card"
                        />
                    </p>
                </template>
                <template v-slot:secondary>
                    <r-checkbox label="Authorize company to charge your payment card, and agree to be bound by the terms of use and privacy policy"/>
                </template>
                <template v-slot:actions>
                    <r-button type="primary" @click="submit">Submit</r-button>
                </template>
            </r-tile>
        `,
    }));
