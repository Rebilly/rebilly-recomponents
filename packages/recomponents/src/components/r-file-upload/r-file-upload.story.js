import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import markdown from './r-file-upload.md';
import RFileUpload from './r-file-upload.vue';

storiesOf('Components.File Upload', module)
  .addParameters({ component: RFileUpload })
  .add('Component', () => ({
    template: `
            <div class="storybook-center">
                <r-file-upload
                    @input="input"
                    :multiple="true"
                    :disabled="disabled">
                    <r-icon-button
                        type="default"
                        :disabled="disabled"
                        slot-scope="{openFileBrowser, setFocus}"
                        @click="openFileBrowser"
                        @focus="setFocus">
                        <r-icon icon="clip"/>
                    </r-icon-button>
                </r-file-upload>
            </div>
        `,
    data: () => ({
      image: null,
    }),
    methods: {
      input(files) {
        const [image = false] = files;
        if (image) {
          this.$nextTick(() => {
            action('input');
          });
        }
      },
    },
    props: {
      disabled: {
        default: boolean('Disabled', false),
      },
      multiple: {
        default: boolean('Multiple', false),
      },
    },
  }), {
    notes: { markdown },
  })
  .add('With preview', () => ({
    template: `
            <div class="storybook-center">
                <r-tile>
                    <template v-slot:title>
                        <h2>Upload image with preview</h2>
                    </template>
                    <template v-slot:contents>
                        <section v-content>
                            <r-file-upload
                                @input="input"
                                :multiple="true"
                                :disabled="disabled">
                                <r-icon-button
                                    type="default"
                                    :disabled="disabled"
                                    slot-scope="{openFileBrowser, setFocus}"
                                    @click="openFileBrowser"
                                    @focus="setFocus">
                                    <r-icon icon="clip"/>
                                    Select image to upload
                                </r-icon-button>
                            </r-file-upload>
                        </section>
                        <section v-content.secondary>
                            <div v-for="(image, index) in images" @click="remove(index)" :key="image" title="Click to remove" style="max-width: 400px">
                                <r-img :src="image"/>
                            </div>
                        </section>
                    </template>
                </r-tile>
            </div>
        `,
    data: () => ({
      images: ['https://placehold.co/37'],
    }),
    methods: {
      input(images) {
        if (images.length) {
          this.$nextTick(() => {
            this.images = Array.from(images).map((image) => URL.createObjectURL(image));
            action('input', images);
          });
        }
      },
      remove(id) {
        this.images = this.images.filter((image, index) => index !== id);
      },
    },
    props: {
      disabled: {
        default: boolean('Disabled', false),
      },
      multiple: {
        default: boolean('Multiple', false),
      },
    },
  }), {
    notes: { markdown },
  });
