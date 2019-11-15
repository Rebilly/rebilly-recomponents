<template>
    <div class="table-control flex-center">
        <r-loader v-if="isLoading"/>
        <template v-else>
            <table class="table" v-if="hasRows">
                <slot name="colgroup"/>
                <slot name="thead">
                    <thead>
                    <tr>
                        <slot name="headers"/>
                    </tr>
                    </thead>
                </slot>
                <tbody>
                <template v-for="(item, itemIdx) in rows">
                    <slot :item="item" :index="itemIdx"/>
                </template>
                </tbody>
            </table>
            <slot name="empty" v-else></slot>
        </template>
    </div>
</template>

<script>
    export default {
        props: {
            provider: {
                type: Function,
                required: true,
            },
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
    };
</script>

<style lang="scss">
    @import '../../styles/table.scss';
</style>
