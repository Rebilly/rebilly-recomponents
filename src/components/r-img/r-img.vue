<template>
    <figure class="r-component r-img">
        <template v-if="lazy">
            <img ref="img" :alt="src"/>
        </template>
        <template v-else>
            <img :src="src" :alt="alt"/>
        </template>
    </figure>
</template>

<script>
    const EVENTS = ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove'];

    export default {
        name: 'r-img',

        props: {
            src: {
                type: String,
                required: true,
            },
            alt: {
                type: String,
                default: 'Recomponents image',
            },
            lazy: {
                type: Boolean,
                default: false,
            },
        },

        mounted() {
            if (this.lazy && typeof window !== 'undefined') {
                EVENTS.forEach((evt) => {
                    window.document.addEventListener(evt, this.debounce(() => {
                        const rect = this.$refs.img.getBoundingClientRect();

                        if (rect.top < window.innerHeight && rect.left < window.innerWidth) {
                            this.$refs.img.src = this.src;
                        }
                    }, 250));
                });
            }
        },

        methods: {
            onload() {
                this.$emit('onload');
            },
            onerrror() {
                this.$emit('error');
            },
            debounce(action, delay) {
                let timeout;
                return () => {
                    const callback = (...args) => {
                        action.apply(this, args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(callback, delay);
                };
            },
        },
    };
</script>

<style lang="scss">

</style>
