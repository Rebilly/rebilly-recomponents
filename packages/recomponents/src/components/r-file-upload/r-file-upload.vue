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
            multiple: Boolean,
            accept: String,
            disabled: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                isPickerOpen: false,
            };
        },
        methods: {
            resetFileValue() {
                this.$refs.inputFile.value = '';
            },
            /**
             * openFileBrowser opens the picker file modal
             * Important: This function is passed as slot props so child
             * trigger component MUST called using scoped slots in order
             * to open de modal.
             */
            openFileBrowser() {
                this.isPickerOpen = true;
                this.$refs.inputFile.click();
            },
            /**
             * setFocus allows to determine if the file picker was close
             * and emit 'close' and 'cancel' event if no file was selected.
             * This is a workaround since 'cancel' and 'close' events for
             * file picker are not explicit emitted.
             * Important: This function is passed as slot props so child
             * input components MUST called using scoped slots in order to work.
             */
            setFocus() {
                if (this.isPickerOpen) {
                    this.isPickerOpen = false;
                    // Wait for the input event (focus happens first)
                    // and emit cancel if no file selected
                    const inputFileUpdateDelay = 100; // ms;
                    setTimeout(() => {
                        if (!this.$refs.inputFile || !this.$refs.inputFile.files.length) {
                            // The dialog was open and no file was selected
                            // we assume cancel button was clicked.
                            this.$emit('cancel');
                            this.$emit('close');
                        }
                    }, inputFileUpdateDelay);
                }
            },
            input($event) {
                this.isPickerOpen = false;
                this.$emit('input', $event.target.files);
                this.$emit('close');
            },
        },
    }
</script>

<style lang="scss">
    @import './r-file-upload.scss';
</style>
