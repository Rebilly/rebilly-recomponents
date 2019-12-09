import {storiesOf} from '@storybook/vue';
import {boolean, select, text} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import markdown from './r-modal.md';
import RModal from './r-modal.vue';

storiesOf('Refactored.Modal', module)
    .addParameters({component: RModal})
    .add('Component', () => ({
        data() {
            return {
                isModalOpen: false,
            };
        },
        props: {
            title: {
                default: text('Title', 'Modal'),
            },
            cancelLabel: {
                default: text('Cancel button label', 'Close'),
            },
            size: {
                default: select('Size', {
                    Large: 'large',
                    'Extra Large': 'extra-large',
                    Fluid: 'fluid',
                }, 'large'),
            },
            scroll: boolean('Scroll', true),
            scrollContent: boolean('Scroll content', false),
        },
        methods: {
            close: action('close'),
            submit: action('submit'),
            leave: action('leave'),
            enter: action('enter'),
        },
        template: `
            <div class="storybook-center">
                <r-button @click="isModalOpen = true;">Open</r-button>
                <r-modal v-if="isModalOpen"
                        :title="title"
                        :cancelLabel="cancelLabel"
                        :size="size"
                        :scroll="scroll"
                        :scrollContent="scrollContent"
                        @submit="submit"
                        @enter="enter"
                        @leave="leave"
                        @close="close(); isModalOpen = false;">
                    <div slot="content">
                        <p v-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </r-modal>
            </div>
        `,
    }), {
        notes: {markdown},
    })
    .add('Multi-step Form', () => ({
        data() {
            return {
                activeStep: null,
                steps: [{name: 'Step 1'}, {name: 'Step 2'}, {name: 'Step 3'}],
            };
        },
        props: {
            cancelLabel: {
                default: text('Cancel button label', 'Close'),
            },
            size: {
                default: select('Size', {
                    Large: 'large',
                    'Extra Large': 'extra-large',
                    Fluid: 'fluid',
                }, 'large'),
            },
            scroll: boolean('Scroll', true),
            scrollContent: boolean('Scroll content', false),
        },
        methods: {
            close: action('close'),
            submit: action('submit'),
            leave: action('leave'),
            enter: action('enter'),
            finish: action('finish'),
        },
        template: `
            <div class="storybook-center">
                <r-button @click="activeStep = 0;">Open</r-button>
                <template v-for="(step, index) in steps">
                    <r-modal v-if="index === activeStep"
                            :title="step.name"
                            :cancelLabel="cancelLabel"
                            :size="size"
                            :scroll="scroll"
                            :scrollContent="scrollContent"
                            @submit="submit"
                            @enter="enter"
                            @leave="leave"
                            @close="close(); activeStep = null;">
                        <div slot="content">
                            <template v-if="activeStep === 0">
                                <p style="margin: 10px 0;"><r-input placeholder="First name"/></p>
                                <p style="margin: 10px 0;"><r-input placeholder="Last name"/></p>
                            </template>
                            <template v-if="activeStep === 1">
                                <p style="margin: 10px 0;"><r-input placeholder="Address"/></p>
                                <p style="margin: 10px 0;"><r-input placeholder="ZIP"/></p>
                            </template>
                            <template v-if="activeStep === 2">
                                <p style="margin: 10px 0;"><r-input placeholder="E-mail"/></p>
                                <p style="margin: 10px 0;"><r-input placeholder="Phone number"/></p>
                            </template>
                        </div>

                        <template slot="actions">
                            <r-button v-if="activeStep !== 0" @click="activeStep = activeStep - 1">Back</r-button>
                            <r-button v-if="activeStep < steps.length - 1" @click="activeStep = activeStep + 1">Next</r-button>
                            <r-button v-if="activeStep === steps.length - 1" @click="finish">Finish</r-button>
                        </template>
                    </r-modal>
                </template>
            </div>
        `,
    }), {
        notes: {markdown},
    });
