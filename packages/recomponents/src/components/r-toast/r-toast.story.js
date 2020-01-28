import {storiesOf} from '@storybook/vue';
import {boolean, select, text} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import markdown from './r-toast.md';
import RToast from './r-toast.vue';

function destroyToastManuallyWhenTheUserNavigatesToAnotherStory(className) {
    document.querySelectorAll(className).forEach(el => el && el.remove());
}

storiesOf('Components.Toast', module)
    .addParameters({component: RToast})
    .add('Component', () => ({
        template: `
            <div class="storybook-center">
                <r-toast class="component-story"
                         :visible="true"
                         :type="type"
                         :title="title"
                         :auto-hide="autoHide"
                         :allow-close="allowClose"
                         :message="message"
                         @hide="hide"></r-toast>
            </div>
        `,
        props: {
            type: {
                default: select('Type', [
                    'positive',
                    'negative',
                    'warning',
                    'info',
                ], 'positive'),
            },
            title: {
                default: text('Title', 'Title'),
            },
            allowClose: {
                default: boolean('Allow close', false),
            },
            autoHide: {
                default: boolean('Auto Hide', false),
            },
            message: {
                default: text('Message', 'This is the toast message'),
            },
        },
        methods: {
            hide: action('hide'),
        },
        destroyed() {
            destroyToastManuallyWhenTheUserNavigatesToAnotherStory('.component-story');
        },
    }), {
        notes: {markdown},
    })
    .add('All types', () => ({
        template: `
            <div class="storybook-center">
                <div class="storybook-item" v-for="type in types">
                    <r-toast
                        class="all-types-story"
                        :visible="true"
                        :type="type"
                        :title="type">
                    </r-toast>
                </div>
            </div>
        `,
        props: {
            types: {
                default: [
                    'positive',
                    'negative',
                    'warning',
                    'info',
                ],
            },
        },
        destroyed() {
            // Manually destroy toast when the user navigates to another story
            destroyToastManuallyWhenTheUserNavigatesToAnotherStory('.all-types-story');
        },
    }), {
        notes: {markdown},
    })
    .add('Manager', () => ({
        template: `
            <div>
                <div class="storybook-center">
                    <div class="r-grid">
                        <div class="r-grid-item">
                            <r-button type="default" @click="addToast('positive')">Positive</r-button>
                            <r-button type="default" @click="addToast('negative')">Negative</r-button>
                            <r-button type="default" @click="addToast('warning')">Warning</r-button>
                            <r-button type="default" @click="addToast('info')">Info</r-button>
                        </div>
                    </div>
                </div>
            </div>
        `,
        props: {},
        methods: {
            addToast(type) {
                this.$toast[type](`Test ${type} toast :)`);
            },
            hide: action('hide'),
        },
    }), {
        notes: {markdown},
    })
    .add('Render function', () => ({
        template: `
            <div>
                <div class="storybook-center">
                    <div class="r-grid">
                        <div class="r-grid-item">
                            <r-button type="default" @click="renderFunction">Render function</r-button>
                        </div>
                    </div>
                </div>
            </div>
        `,
        methods: {
            renderFunction() {
                this.$toast.warning(createElement => createElement('h1', 'H1 Toast Content'));
            },
        },
    }), {
        notes: {markdown},
    });
