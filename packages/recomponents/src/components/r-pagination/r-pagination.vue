<template>
    <div>
        <slot name="pagination" :pagination="pagination">
            <r-pagination-control :pagination="pagination"/>
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
             * TBD
             */
            provider: {
                type: Function,
                required: true,
            },
            /**
             * TBD
             */
            total: {
                type: Number,
                required: true,
            },
            /**
             * TBD
             */
            limit: {
                type: Number,
                required: true,
            },
            /**
             * TBD
             */
            totalVisible: {
                type: [Number, Boolean],
            },
        },
        data() {
            return {
                data: [],
                // TODO probably page as props value, to able to start with page from url query (or etc)
                page: 1,
            };
        },
        methods: {
            next() {
                const page = this.page + 1;
                this.navigate(page > this.pages ? this.pages : page);
            },
            previous() {
                const page = this.page - 1;
                this.navigate(page < 1 ? 1 : page);
            },
            navigate(number) {
                this.page = number;
                /**
                 * Emits when it is navigated to next, previous or another page
                 * @type {Event}
                 */
                this.$emit('navigate', this.page);
            },
            range(start, end) {
                const range = [];

                start = start > 0 ? start : 1;
                for (let i = start; i <= end; i += 1) {
                    range.push(i);
                }

                return range;
            },
        },
        provide() {
            return {
                paginationPage: this.navigate,
                paginationNext: this.next,
                paginationPrevious: this.previous,
                paginationOffset: () => this.page,
                paginationTotal: () => this.total,
                paginationLimit: () => this.limit,
                paginationItems: () => this.items,
                paginationHasNext: () => this.hasNext,
                paginationHasPrevious: () => this.hasPrevious,
            };
        },
        computed: {
            items() {
                const {totalVisible} = this;

                if (!totalVisible) {
                    return null;
                }

                if (this.pages <= totalVisible || totalVisible < 1) {
                    return this.range(1, this.pages);
                }

                const even = totalVisible % 2 === 0 ? 1 : 0;
                const left = Math.floor(totalVisible / 2);
                const right = this.pages - left + 1 + even;

                if (this.page > left && this.page < right) {
                    const start = this.page - left + 1;
                    const end = this.page + left - 1 - even;

                    if (totalVisible === 1 || totalVisible === 2) {
                        const items = [];
                        if (totalVisible === 2) {
                            items.push(1);
                        }
                        if (this.page !== 1 && (this.page !== 2 && totalVisible === 2)) {
                            items.push('...');
                        }
                        items.push(this.page);
                        if (this.page !== this.pages) {
                            items.push('...');
                        }
                        return items;
                    }

                    return [1, '...', ...this.range(start, end), '...', this.pages];
                }
                if (this.page === left) {
                    const end = this.page + left - 1 - even;
                    return end < 1 ? [...this.range(1, this.page), '...'] : [...this.range(1, end), '...', this.pages];
                }
                if (this.page === right) {
                    const start = this.page - left + 1;
                    return [1, '...', ...this.range(start, this.pages)];
                }
                return [
                    ...this.range(1, left),
                    '...',
                    ...this.range(right, this.pages),
                ];
            },
            pages() {
                let pages = Math.ceil(this.total / this.limit);
                if (pages < 0) {
                    pages = 0;
                }
                return pages;
            },
            hasPagination() {
                return this.limit < this.total;
            },
            hasNext() {
                return (this.page + 1) <= this.pages;
            },
            hasPrevious() {
                return (this.page - 1) >= 1;
            },
            pagination() {
                return {
                    hasPagination: this.hasPagination,
                    provider: this.provider(this.page),
                    offset: this.page,
                    items: this.items,
                };
            },
        },
    };
</script>
