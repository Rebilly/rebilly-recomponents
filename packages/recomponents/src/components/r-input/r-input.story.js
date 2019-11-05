import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {text, select, boolean} from '@storybook/addon-knobs';
import markdown from './r-input.md';

storiesOf('Components', module)
    .add('Input', () => ({
        template: `
            <r-input
                v-model="model"
                :label="label"
                :disabled="disabled"
                :placeholder="placeholder"
                :helpText="helpText"
                :multiline="multiline"
                :submitOnEnter="submitOnEnter"
                :leftIcon="leftIcon"
                :leftIconClickPointer="leftIconClickPointer"
                :leftIconSpinning="leftIconSpinning"
                :rightIcon="rightIcon"
                :rightIconClickPointer="rightIconClickPointer"
                :rightIconSpinning="rightIconSpinning"
                :leftLabel="leftLabel"
                :rightLabel="rightLabel"
                :password="password"
                :numeric="numeric"
                :rows="rows"
                :autoFocus="autoFocus"
                :autoHighlight="autoHighlight"
                :maxLength="maxLength"
                :autoResize="autoResize"
                :autoComplete="autoComplete"
                @focus="focus"
                @click="click"
                @input="input"
                @key-submit="keySubmit"
                @key-press="keyPress"
                @key-down="keyDown"
                />
        `,
        methods: {
            focus: action('focus'),
            click: action('click'),
            input: action('input'),
            keySubmit: action('keySubmit'),
            keyPress: action('keyPress'),
            keyDown: action('keyDown'),
        },
        props: {
            label: {
                default: text('label', 'Label'),
            },
            disabled: {
                default: boolean('disabled', false),
            },
            placeholder: {
                default: text('placeholder', 'Please input value here'),
            },
            helpText: {
                default: text('helpText', 'Help text here to explain something'),
            },
            multiline: {
                default: boolean('multiline', false),
            },
            submitOnEnter: {
                default: boolean('submitOnEnter', false),
            },
            leftIcon: {
                default: select('leftIcon', ['', 'search', 'customers', 'lock', 'burger'], ''),
            },
            leftIconClickPointer: {
                default: boolean('leftIconClickPointer', false),
            },
            leftIconSpinning: {
                default: boolean('leftIconSpinning', false),
            },
            rightIcon: {
                default: select('rightIcon', ['', 'search', 'customers', 'lock', 'burger'], ''),
            },
            rightIconClickPointer: {
                default: boolean('rightIconClickPointer', false),
            },
            rightIconSpinning: {
                default: boolean('rightIconSpinning', false),
            },
            leftLabel: {
                default: select('leftLabel', ['', 'left label'], ''),
            },
            rightLabel: {
                default: select('rightLabel', ['', 'right label'], ''),
            },
            password: {
                default: boolean('password', false),
            },
            numeric: {
                default: boolean('numeric', false),
            },
            rows: {
                default: text('rows', '5'),
            },
            autoFocus: {
                default: boolean('autoFocus', false),
            },
            autoHighlight: {
                default: boolean('autoHighlight', false),
            },
            maxLength: {
                // TODO: bug? it could be saying: '(-4 characters left.)' if multiline is false
                default: select('maxLength', [null, 15, 50], null),
            },
            autoResize: {
                default: boolean('autoResize', false),
            },
            autoComplete: {
                default: text('autoComplete', ''),
            },
        },
        data: () => ({
            model: 'value here',
        }),
    }), {
        notes: {markdown},
    });
