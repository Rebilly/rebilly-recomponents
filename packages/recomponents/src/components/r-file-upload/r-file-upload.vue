<template>
    <div class="r-file-upload" v-fs-block>
        <input class="r-file-upload-input"
            type="file"
            ref="inputFile"
            :multiple="multiple"
            :accept="accept"
            :disabled="disabled"
            @change="input"/>
        <slot :open-file-browser="openFileBrowser" :set-focus="setFocus"/>
    </div>
</template>

<script>
    export default {
        name: 'RFileUpload',
        props: {
            /**
             * Allow to submit multiple files
             */
            multiple: Boolean,
            /**
             * Limit allowed file extensions
             */
            accept: String,
            /**
             * Similar to native disabled property
             */
            disabled: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                open: false,
            };
        },
        methods: {
            /**
             * Open picker with files
             * This function is passed as slot props so child called using scoped slots in order to work.
             */
            openFileBrowser() {
                this.open = true;
                this.$refs.inputFile.click();
            },
            /**
             * Workaround since 'cancel' and 'close' events for file picker are not explicit emitted.
             * This function is passed as slot props so child called using scoped slots in order to work.
             */
            setFocus() {
                if (this.open) {
                    this.open = false;
                    /**
                     * Wait for the input event and emit cancel if no file selected
                     */
                    this.$nextTick(() => {
                        if (!this.$refs.inputFile || !this.$refs.inputFile.files.length) {
                            /**
                             * The dialog was open and no file was selected
                             */
                            this.$emit('cancel');
                            this.$emit('close');
                        }
                    });
                }
            },
            input($event) {
                this.open = false;
                this.$emit('input', $event.target.files);
                this.$emit('close');
            },
        },
    }
</script>

<style lang="scss">
    @import './r-file-upload.scss';
</style>
