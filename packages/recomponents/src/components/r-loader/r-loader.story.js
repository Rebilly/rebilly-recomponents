import {storiesOf} from '@storybook/vue';
import {boolean} from '@storybook/addon-knobs';
import markdown from './r-loader.md';

storiesOf('Components/Loader', module)
    .add('Fullscreen Loader', () => ({
        props: {
            show: {
                default: boolean('Show', true),
            },
            loading: {
                default: boolean('Loading', true),
            },
            fullscreen: {
                default: boolean('Fullscreen', true),
            },
        },
        template: `<r-loader :show="show" :loading="loading" :fullscreen="fullscreen"/>`,
    }), {
        notes: {markdown},
    })
    .add('Secondary Loader', () => ({
        props: {
            show: {
                default: boolean('Show', true),
            },
            loading: {
                default: boolean('Loading', true),
            },
            fullscreen: {
                default: boolean('Fullscreen', false),
            },
        },
        template: `
          <div style="width: 250px; position: relative">
                <r-loader :show="show" :loading="loading" :fullscreen="fullscreen"/>
                <r-tile>
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
                        <r-button type="default">Cancel</r-button>
                        <r-button type="primary">Submit</r-button>
                    </template>
                </r-tile>
          </div>`,
    }), {
        notes: {markdown},
    });
