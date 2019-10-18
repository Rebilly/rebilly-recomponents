import {storiesOf} from '@storybook/vue';
import {text} from '@storybook/addon-knobs';
import RButton from '../../components/r-button/r-button.vue';
import markdown from './r-tooltip.md';

storiesOf('Directives', module)
    .add('Tooltip', () => ({
        components: {RButton},
        props: {
            text: {
                default: text('Tooltip text', 'Tooltip Directive'),
            },
        },
        template: `
            <div>
                <div>
                    <r-button type="primary" v-tooltip="{text: text}">With button</r-button>
                    <r-badge type="info" v-tooltip="{text: text}">With badge</r-badge>
                    <r-radio label="With radio"/>
                    <r-checkbox label="With checkbox"/>
                </div>
                <div>
                    <r-img src="https://www.rebilly.com/wp-content/uploads/2019/01/new_features@2x-319x150.png" v-tooltip="{text: text}"/>
                </div>
            </div>
        `,
    }), {
        notes: {markdown},
    });
