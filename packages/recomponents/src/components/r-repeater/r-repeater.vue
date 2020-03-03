<template>
    <div class="r-table-control flex-center">
        <r-loader v-if="isLoading" :fullscreen="isLoaderFullscreen"></r-loader>
        <template v-else>
            <table class="r-table" v-if="hasRows">
                <!-- @slot for colgroups - see HTML \<colgroup> -->
                <slot name="colgroup"/>
                <!-- @slot for thead - see HTML \<thead> -->
                <slot name="thead">
                    <thead>
                    <tr>
                        <!-- @slot to just specify the \<th> of your table, rather than the whole thead -->
                        <slot name="headers"/>
                    </tr>
                    </thead>
                </slot>
                <tbody>
                <template v-for="(item, itemIdx) in rows">
                    <!-- @slot for content that belongs in a \<tr> -->
                    <slot :item="item" :index="itemIdx"/>
                </template>
                </tbody>
            </table>
            <!-- @slot for empty states (if the provider function returns no data) -->
            <slot name="empty" v-else></slot>
        </template>
    </div>
</template>

<script>
    import RLoader from '../r-loader/r-loader.vue';

    export default {
        components: {
            RLoader,
        },
        props: {
            /**
             * Returns some data to be rendered by the default scoped slot
             */
            provider: {
                type: Function,
                required: true,
            },
            /**
             * Defines if the loading state is fullscreen
             */
            isLoaderFullscreen: {
                type: Boolean,
                default: true,
            },
            /**
             * Defines the property, which changes will trigger the fetching of data
             */
            watcher: {},
        },
        data() {
            return {
                isLoading: false,
                rows: [],
            };
        },
        computed: {
            hasRows() {
                return this.rows.length > 0;
            },
        },
        methods: {
            async fetchData() {
                this.isLoading = true;
                try {
                    this.rows = await this.provider();
                } catch (error) {
                    console.error(error);
                } finally {
                    this.isLoading = false;
                }
            },
        },
        created() {
            this.fetchData();
        },
        watch: {
            watcher() {
                this.fetchData();
            },
        },
    };
</script>

<style lang="scss">
    @import '@/styles/table.scss';
</style>
