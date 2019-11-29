<template>
    <div class="avatar avatar-description">
        <div class="avatar-image" v-fs-block>
            <div class="avatar-initials" :class="['avatar-initials-' + initialsColor]" v-if="initials">
                <span>{{initials}}</span>
            </div>
            <div class="avatar-icon" v-if="icon">
                <r-icon :icon="icon"/>
            </div>
            <div class="avatar-image-image" v-if="image">
                <r-img :src="image"/>
            </div>
        </div>
        <div class="avatar-info">
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
            initials: {
                type: String,
                validator(value) {
                    if (value.length > 2) {
                        console.warn('RAvatar: should provide only 2 symbols for initials');
                    }
                    return true;
                },
            },
            description: {
                type: String,
            },
            image: {
                type: String,
            },
            color: {
                type: String,
            },
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
