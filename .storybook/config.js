import Vue from 'vue';
import NoSSR from 'vue-no-ssr';
import VueI18n from 'vue-i18n';
import { configure, addDecorator, addParameters } from '@storybook/vue';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { withContexts } from '@storybook/addon-contexts/vue';
import { withCssResources } from '@storybook/addon-cssresources';

Vue.use(VueI18n)
Vue.component('no-ssr', NoSSR);

const i18n = new VueI18n({
    locale: 'ja',
});

const localeContext = {
    name: 'I18NProvider',
    props: ['locale'],
    watch: {
        locale: function(newValue) {
            this.$root.$i18n.locale = newValue;
        }
    },
    i18n,
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

import '../public/main.css';

const req = require.context('../src/components/', true, /\.story\.js$/);

function loadStories() {
  req.keys().forEach(req);
}

addDecorator(withA11y)
addDecorator(withKnobs);
addDecorator(withContexts(topLevelContexts));
addDecorator(withCssResources)
addParameters({
  cssresources: [{
      id: `boostrap`,
      code: `
        <style>
            :root {
                --primary-color: #D44400;
                --primary-color-dark: #6e2300;
                --primary-color-light: #d40026;
            }
        </style>`,
      picked: false,
    },
  ],
});

configure(loadStories, module);
