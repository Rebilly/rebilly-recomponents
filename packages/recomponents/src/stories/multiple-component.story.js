import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {text} from '@storybook/addon-knobs';
import {
    RBadge, RTile, RInput, RCheckbox, RButton,
} from '../index';

storiesOf('Demo', module)
    .add('Multiple Components', () => ({
        components: {
            RBadge, RTile, RInput, RCheckbox, RButton,
        },
        props: {
            width: {
                default: text('Form width', '900px'),
            },
        },
        methods: {
            cancel: action('cancel'),
            submit: action('submit'),
        },
        template: `
            <r-tile :style="{width: width}">
                <template v-slot:title>
                    <h2>Make a payment 123</h2>
                </template>
                <template v-slot:primary>
                    <p>
                        <r-badge type="positive">Positive</r-badge>
                        <r-badge type="warning">Warning</r-badge>
                        <r-badge type="positive">Positive</r-badge>
                        <r-badge type="negative">Warning</r-badge>
                        <r-badge type="positive">Positive</r-badge>
                        <r-badge type="warning">Warning</r-badge>
                        <r-badge type="negative">Positive</r-badge>
                        <r-badge type="warning">Warning</r-badge>
                        <r-badge type="positive">Positive</r-badge>
                        <r-badge type="warning">Warning</r-badge>
                        <r-badge type="positive">Positive</r-badge>
                        <r-badge type="warning">Warning</r-badge>
                    </p>
                    <p>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                        <r-button type="default" @click="cancel">Cancel</r-button>
                        <r-button type="primary" @click="submit">Submit</r-button>
                    </p>
                    <p>
                        <r-checkbox label="ASD" :value="false">Submit</r-checkbox>
                        <r-checkbox label="ASD" :value="false">Submit</r-checkbox>
                        <r-checkbox label="ASD" :value="false">Submit</r-checkbox>
                        <r-checkbox label="ASD" :value="true">Submit</r-checkbox>
                        <r-checkbox label="ASD" :value="false">Submit</r-checkbox>
                        <r-checkbox label="ASD" :value="false">Submit</r-checkbox>
                        <r-checkbox label="ASD" :value="true">Submit</r-checkbox>
                        <r-checkbox label="ASD" :value="false">Submit</r-checkbox>
                        <r-checkbox label="ASD" :value="false">Submit</r-checkbox>
                        <r-checkbox label="ASD" :value="true">Submit</r-checkbox>
                        <r-checkbox label="ASD" :value="false">Submit</r-checkbox>
                        <r-checkbox label="ASD" :value="false">Submit</r-checkbox>
                        <r-checkbox label="ASD" :value="false">Submit</r-checkbox>
                        <r-checkbox label="ASD" :value="false">Submit</r-checkbox>
                    </p>
                    <p>
                        <r-input placeholder="Here is input" value="some text"/>
                        <r-input placeholder="Here is input" value="some text"/>
                        <r-input placeholder="Here is input" value="some text"/>
                        <r-input placeholder="Here is input" value="some text"/>
                        <r-input placeholder="Here is input" value="some text"/>
                        <r-input placeholder="Here is input" value="some text"/>
                        <r-input placeholder="Here is input" value="some text"/>
                        <r-input disabled placeholder="Here is input" value="some text"/>
                        <r-input placeholder="Here is input" value="some text"/>
                    </p>
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
                </template>
                <template v-slot:secondary>
                    <r-checkbox label="Authorize company to charge your payment card, and agree to be bound by the terms of use and privacy policy"/>
                </template>
                <template v-slot:actions>
                    <r-button type="default" @click="cancel">Cancel</r-button>
                    <r-button type="primary" @click="submit">Submit</r-button>
                </template>
            </r-tile>
        `,
    }), {
        notes: 'Example of payment form with input and buttons components',
    });
