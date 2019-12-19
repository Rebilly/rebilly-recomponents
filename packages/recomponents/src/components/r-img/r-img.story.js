import {storiesOf} from '@storybook/vue';
import {boolean, text} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import markdown from './r-img.md';
import RImg from './r-img.vue';

storiesOf('Components.Image', module)
    .addParameters({component: RImg})
    .add('Component', () => ({
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
                default: text('Width', '319px'),
            },
            height: {
                default: text('Height', '150px'),
            },
        },
        methods: {
            onload: action('onload'),
            onerror: action('onerror'),
        },
        template: `
            <div class="storybook-center">
                <div>
                    <r-img
                            :src="src"
                            :lazy="lazy"
                            :alt="alt"
                            :height="height"
                            :width="width"
                            @onload="onload"
                            @onerror="onerror"/>      
                </div>               
            </div>
    
`,
    }), {
        notes: {markdown},
    })
    .add('Image with aspect ratio', () => ({
        props: {
            unknownImage: {
                default: boolean('Unknown image', false),
            },
            source: {
                default: text('Source', 'https://www.rebilly.com/wp-content/uploads/2019/01/new_features@2x-319x150.png'),
            },
            lazy: {
                default: boolean('Lazy load', false),
            },
            alt: {
                default: text('Alt text', 'Aspect Ratio Story Image'),
            },
            width: {
                default: text('Width', ''),
            },
            height: {
                default: text('Height', ''),
            },
            aspectRatio: {
                default: text('Aspect Ratio', '9/16'),
            },
        },
        computed: {
            src() {
                return this.unknownImage ? '' : this.source;
            },
        },
        methods: {
            onload: action('onload'),
            onerror: action('onerror'),
        },
        template: `
           <div class="storybook-center">
                <r-tile :style="{width: '25%'}">
                    <template v-slot:title>
                        <h2>Image Component</h2>
                    </template>
                    <template v-slot:primary>
                        <div>
                            <p>There is a place reserved for the image.</p>
                            <r-img
                                    :src="src"
                                    :lazy="lazy"
                                    :alt="alt"
                                    :height="height"
                                    :width="width"
                                    :aspectRatio="aspectRatio"
                                    @onload="onload"
                                    @onerror="onerror"/>
                            <p>Is it?</p>
                        </div>
                    </template>
                </r-tile>
            </div>
    
`,
    }), {
        notes: {markdown},
    });
