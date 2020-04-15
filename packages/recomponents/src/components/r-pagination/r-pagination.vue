<template>
    <div>
        <!-- @slot Pagination component  -->
        <slot name="pagination" :pagination="pagination">
            <r-pagination-control :total="total"
                                  :limit="limit"
                                  :offset="offset"
                                  :expanded="expanded"
                                  :show-pagination="showPagination"
                                  @navigate="$emit('navigate')"/>
        </slot>
    </div>
</template>

<script>
    import Vue from 'vue';
    import PaginationControl from '../r-pagination-control/r-pagination-control.vue';

    Vue.component('r-pagination-control', PaginationControl);

    export default {
        name: 'r-pagination',
        props: {
            /**
             * Number of items displayed on a single page
             */
            limit: {
                type: Number,
                default: 20,
            },
            /**
             * Offset
             */
            offset: {
                type: Number,
                default: 0,
            },
            /**
             * Number of items handled by pagination in total
             */
            total: {
                type: Number,
                default: 0,
            },
            /**
             * Define if the pagination should be shown
             */
            showPagination: {
                type: Boolean,
                default: true,
            },
            /**
             * Define if the pagination is expanded
             */
            expanded: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            pagination() {
                return {
                    showPagination: this.showPagination,
                    expanded: this.expanded,
                    total: this.total,
                    offset: this.offset,
                    limit: this.limit,
                };
            },
        },
    };
</script>
