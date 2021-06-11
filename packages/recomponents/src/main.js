import './polyfill';

import './styles/helpers.scss';
import './styles/theme.scss';

import { createApp } from 'vue';
import App from './App.vue';
import kebabCase from './common/helpers/kebab-case';
import RTest from './components/r-test/r-test.vue';
import * as components from './components';
import * as directives from './directives';

console.log('Calling main create App');
const app = createApp(App);
app.component('r-test', RTest);

/**
* Injecting all components according to their filenames
*/
Object.keys(components).forEach((key) => {
  app.component(key, components[key]);
});

/**
* Injecting all directives without 'r' prefix
*/
Object.keys(directives).forEach((key) => {
  app.directive(kebabCase(key.substr(1)), directives[key]);
});
app.mount('#app');
