import {storiesOf} from '@storybook/vue';
import {text, boolean} from '@storybook/addon-knobs';
import RImg from './r-img.vue';
import markdown from './r-img.md';

storiesOf('Components', module)
    .add('Image', () => ({
        components: {RImg},
        props: {
            src: {
                default: text('Source', 'https://www.rebilly.com/wp-content/uploads/2019/01/new_features@2x-319x150.png'),
            },
            lazy: {
                default: boolean('Laly load', true),
            },
            alt: {
                default: text('Alt text', 'Lazy loaded image'),
            },
        },
        template: `
            <r-img
                :src="src"
                :lazy="lazy"
                :alt="alt"
            />
        `,
    }), {
        notes: {markdown},
    });
