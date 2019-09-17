import {storiesOf} from '@storybook/vue';
import {RImg} from '../index';

storiesOf('Demo', module)
    .add('Lazy Loading', () => ({
        components: {RImg},
        props: {},
        methods: {},
        template: `
            <div>
                <r-img src="https://www.rebilly.com/wp-content/uploads/2019/01/new_features@2x-319x150.png" alt="Lazy loading image" :lazy="true"></r-img>
            </div>
        `,
    }), {
        notes: 'Example of lazy loading directive usage',
    });
