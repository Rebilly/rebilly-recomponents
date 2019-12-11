import {storiesOf} from '@storybook/vue';
import markdown from './r-webcomponent.md';
import RWebcomponent from './r-webcomponent.vue';

storiesOf('Components.Webcomponent', module)
    .addParameters({component: RWebcomponent})
    .add('Component', () => {
        setTimeout(() => {
            const vue = document.createElement('script');
            vue.src = 'https://unpkg.com/vue';

            const recomponents = document.createElement('script');
            recomponents.src = 'https://unpkg.com/@rebilly/recomponents/dist/recomponents.js';

            document.head.appendChild(vue);
            vue.onload = () => {
                document.head.appendChild(recomponents);
            };
        }, 1000);

        return `
            <recomponents-r-webcomponent>
                <recomponents-r-button>Click me</recomponents-r-button>
            </recomponents-r-webcomponent>
        `;
    }, {
        notes: {markdown},
    });
