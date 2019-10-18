import {storiesOf} from '@storybook/vue';
import {boolean, number, text} from '@storybook/addon-knobs';
import markdown from './r-img.md';

storiesOf('Components', module)
    .add('Image', () => ({
        props: {
            src: {
                default: text('Source', 'https://www.rebilly.com/wp-content/uploads/2019/01/new_features@2x-319x150.png'),
            },
            lazy: {
                default: boolean('Lazy load', true),
            },
            alt: {
                default: text('Alt text', 'Lazy loaded image'),
            },
            width: {
                default: number('Width', 319),
            },
            height: {
                default: number('Height', 150),
            },
        },
        template: `<r-img
                        :src="src"
                        :lazy="lazy"
                        :alt="alt"
                        :height="height"
                        :width="width"/>
        `,
    }), {
        notes: {markdown},
    });
