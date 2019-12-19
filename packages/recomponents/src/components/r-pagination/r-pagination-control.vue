<template>
    <div>
        <slot name="override" :override="override">
            <div class="r-pagination-control">
                <div class="r-pagination-control-buttons-wrapper">
                    <r-button class="r-pagination-control-button" @click="override.previous"
                              :disabled="!override.hasPrevious">
                        <r-icon icon="arrow-left"/>
                        Prev
                    </r-button>
                    <template v-for="(item, index) in override.items">
                        <span class="r-pagination-control-button"
                              :key="index"
                              v-if="isNaN(item)">
                            {{ item }}
                        </span>
                        <r-button v-else
                                  :key="index"
                                  @click="override.page(item)"
                                  class="r-pagination-control-button"
                                  :class="{'r-button--type-primary': isActive(item)}">
                            {{ item }}
                        </r-button>
                    </template>
                    <r-button class="r-pagination-control-button" @click="override.next" :disabled="!override.hasNext">
                        Next
                        <r-icon icon="arrow-right"/>
                    </r-button>
                </div>
            </div>
        </slot>
    </div>
</template>

<script>
    import RButton from '../r-button/r-button.vue';
    import RIcon from '../r-icon/r-icon.vue';

    export default {
        name: 'r-pagination-control',
        components: {RButton, RIcon},
        inject: [
            'paginationPage',
            'paginationNext',
            'paginationPrevious',
            'paginationOffset',
            'paginationTotal',
            'paginationLimit',
            'paginationItems',
            'paginationHasNext',
            'paginationHasPrevious',
        ],
        computed: {
            offset() {
                return this.paginationOffset();
            },
            total() {
                return this.paginationTotal();
            },
            limit() {
                return this.paginationLimit();
            },
            hasNext() {
                return this.paginationHasNext();
            },
            hasPrevious() {
                return this.paginationHasPrevious();
            },
            items() {
                return this.paginationItems();
            },
            override() {
                return {
                    page: this.paginationPage,
                    next: this.paginationNext,
                    previous: this.paginationPrevious,
                    offset: this.offset,
                    total: this.total,
                    limit: this.limit,
                    items: this.items,
                    hasNext: this.hasNext,
                    hasPrevious: this.hasPrevious,
                };
            },
        },
        methods: {
            isActive(page) {
                return this.offset === page;
            },
        },
    };
</script>

<style lang="scss">
    @import "./r-pagination-control.scss";
</style>
