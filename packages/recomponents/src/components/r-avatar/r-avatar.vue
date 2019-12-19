<template>
    <div class="r-avatar r-avatar-description">
        <div class="r-avatar-main" v-fs-block>
            <div v-if="initials"
                 class="r-avatar-initials"
                 :class="['r-avatar-initials-' + initialsColor]"
            >
                <span class="r-avatar-initials-value">{{initials}}</span>
            </div>
            <div class="r-avatar-icon-wrapper" v-if="icon">
                <r-icon :icon="icon" class="r-avatar-icon"/>
            </div>
            <div class="r-avatar-image-wrapper" v-if="image">
                <r-img :src="image" class="r-avatar-image"/>
            </div>
        </div>
        <div class="r-avatar-info">
            <template v-if="description">
                {{description}}
            </template>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    const colors = ['gray', 'yellow', 'green', 'accent', 'dark-background'];

    export default {
        name: 'RAvatar',
        props: {
            /**
             * TBD
             */
            initials: {
                type: String,
                validator(value) {
                    if (value.length > 2) {
                        console.warn('RAvatar: should provide only 2 symbols for initials');
                    }
                    return true;
                },
            },
            /**
             * TBD
             */
            description: {
                type: String,
            },
            /**
             * TBD
             */
            image: {
                type: String,
            },
            /**
             * TBD
             */
            color: {
                type: String,
            },
            /**
             * TBD
             */
            icon: {
                type: String,
            },
        },
        computed: {
            initialsColor() {
                if (this.color) {
                    return this.color;
                }
                const totalCharValue = this.initials
                    .split('')
                    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
                return colors[totalCharValue % colors.length];
            },
        },
    };
</script>

<style lang="scss">
    @import './r-avatar.scss';
</style>
