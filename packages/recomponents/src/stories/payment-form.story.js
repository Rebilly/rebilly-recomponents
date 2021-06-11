import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';

storiesOf('Demo', module)
  .add('Payment Form', () => ({
    props: {
      width: {
        default: text('Form width', '400px'),
      },
    },
    methods: {
      cancel: action('cancel'),
      submit: action('submit'),
    },
    template: `
            <r-tile :style="{width: width}">
                <template v-slot:title>
                    <h2>Make a payment</h2>
                </template>
                <template v-slot:contents>
                    <section v-content>
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
                    </section>
                    <section v-content.secondary>
                        <r-checkbox label="Authorize company to charge your payment card, and agree to be bound by the terms of use and privacy policy"/>
                    </section>
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
