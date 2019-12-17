import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {select, boolean} from '@storybook/addon-knobs';
import markdown from './r-file-upload.md';
import RFileUpload from './r-file-upload.vue';

storiesOf('Components.File Upload', module)
    .addParameters({component: RFileUpload})
    .add('Component', () => ({
        template: `
            <div class="storybook-center">
                <r-file-upload
                    @input="input"
                    :multiple="true"
                    :disabled="disabled">
                    <r-icon-button
                        type="default"
                        slot-scope="{openFileBrowser}"
                        @click="openFileBrowser">
                        <r-icon icon="clip"/>
                    </r-icon-button>
                </r-file-upload>
            </div>
        `,
        methods: {
            input: action('input'),
            open,
        },
        props: {
            disabled: {
                default: boolean('Disabled', false),
            },
            multiple: {
                default: boolean('Multiple', false),
            },
        },
    }), {
        notes: {markdown},
    });
