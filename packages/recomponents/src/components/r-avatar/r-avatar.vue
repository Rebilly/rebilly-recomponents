<template>
    <div class="avatar avatar-description">
        <div class="avatar-image" v-fs-block>
            <div class="avatar-initials" :class="['avatar-initials-' + initialsColor]">
                <span>{{initials}}</span>
            </div>
        </div>
        <div class="avatar-info">
            <p>Some Text</p>
            <p class="avatar-info-muted-text">Some Text</p>
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
            },
            color: {
                type: String,
            }
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
