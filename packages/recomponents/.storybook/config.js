import Vue from 'vue';
import VueRouter from 'vue-router';
import Recomponents from '../src/index';
import { addDecorator, addParameters, configure } from '@storybook/vue';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
// import { withContexts } from '@storybook/addon-contexts/vue';
import { withCssResources } from '@storybook/addon-cssresources';
import withCentered from '@storybook/addon-centered/vue';
import theme from './theme';
import timezone from '../src/common/helpers/timezone';


Vue.use(VueRouter);
Vue.use(Recomponents);

Vue.use({
    install: function commonHelpers(Vue) {
        Vue.prototype.$tz = function () {
            return timezone;
        };
    },
});

const localeContext = {
    name: 'I18NProvider',
    props: ['locale'],
    watch: {
        locale: function(newValue) {
            this.$root.$i18n.locale = newValue;
        }
    },
    beforeCreate: function() {
        this.$root._i18n = this.$i18n;
    },
    template: '<div><slot/></div>',
};

const topLevelContexts = [
    {
        title: 'Locale',
        components: [localeContext],
    },
];

import '../public/story.css';
import '../src/styles/recomm.scss';

const req = require.context('../src/', true, /\.story\.js$/);

function loadStories() {
    req.keys().forEach(req);
}

addDecorator(withA11y)
addDecorator(withKnobs);
// addDecorator(withContexts(topLevelContexts));
addDecorator(withCssResources)
addDecorator(withCentered);
addParameters({
    options: {
        theme,
    },
    cssresources: [{
        id: `boostrap`,
        picked: false,
        code: `
            <style>
                :root {
                    --primary-font-stack: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"
                    --primary-color: #007bff;
                    --primary-color-dark: #007bff;
                    --primary-color-light: #007bff;
                    --primary-color-medium: #007bff;
                }
            </style>`,
    }],
});

configure(loadStories, module);
