import {storiesOf} from '@storybook/vue';
import {RImg, RTile} from '../index';

storiesOf('Demo', module)
    .add('Lazy Loading', () => ({
        components: {RImg, RTile},
        props: {},
        methods: {},
        template: `
             <r-tile :style="{width: width}">
   <template v-slot:title>
      <h2>Lazy Loading</h2>
   </template>
   <template v-slot:primary>
      <div :style="{width: '25%'}">
         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed risus pretium quam vulputate. Lacus sed viverra tellus in. Venenatis cras sed felis eget velit aliquet. Viverra nam libero justo laoreet sit amet cursus. Porta nibh venenatis cras sed felis eget velit aliquet sagittis. Elementum sagittis vitae et leo duis. Egestas sed sed risus pretium quam. Imperdiet nulla malesuada pellentesque elit. Volutpat consequat mauris nunc congue nisi. Tincidunt id aliquet risus feugiat in. Convallis a cras semper auctor neque vitae tempus quam pellentesque. Semper auctor neque vitae tempus quam pellentesque nec nam aliquam. Velit scelerisque in dictum non consectetur a erat. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit.</p>
         <p>Sodales ut eu sem integer vitae justo. Mi sit amet mauris commodo quis. Vestibulum rhoncus est pellentesque elit. Suspendisse potenti nullam ac tortor vitae purus faucibus. Tristique nulla aliquet enim tortor at auctor urna nunc. Eleifend mi in nulla posuere sollicitudin. Eu feugiat pretium nibh ipsum consequat nisl. Enim sed faucibus turpis in eu mi. Leo urna molestie at elementum eu. Et sollicitudin ac orci phasellus egestas tellus rutrum. Mauris vitae ultricies leo integer malesuada nunc. Consectetur lorem donec massa sapien faucibus et molestie. In mollis nunc sed id semper risus in hendrerit gravida. Convallis convallis tellus id interdum.</p>
         <p>Interdum consectetur libero id faucibus. Enim eu turpis egestas pretium. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet. Tincidunt id aliquet risus feugiat in ante. Ac tincidunt vitae semper quis lectus nulla at volutpat diam. Interdum consectetur libero id faucibus. Sed vulputate odio ut enim blandit volutpat maecenas volutpat. Enim nunc faucibus a pellentesque sit amet porttitor. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla. Pellentesque habitant morbi tristique senectus.</p>
      </div>
      <r-img src="https://www.rebilly.com/wp-content/uploads/2019/01/new_features@2x-319x150.png" alt="Lazy loading image" :lazy="true" :width="319" :height="150"></r-img>
   </template>
   <template v-slot:secondary>
   </template>
   <template v-slot:actions>
   </template>
</r-tile>
        `,
    }), {
        notes: 'Example of lazy loading directive usage',
    });
