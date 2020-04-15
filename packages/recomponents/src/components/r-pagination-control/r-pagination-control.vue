<template>
    <div class="r-pagination-control">
        <template v-if="expanded && showPagination">
            <div class="r-grid-fitted r-pagination-description">
                <div class="r-grid-item">
                    <span class="r-text-muted">
                        Page {{page}} of {{totalPages}} -
                        Showing {{startingRecord}}-{{endingRecord}} of {{total}}
                    </span>
                </div>
                <div class="r-grid-item r-pagination-numbers">
                    <r-button-group>
                        <r-icon-button @click="moveToFirstPage" :disabled="!canMoveBackward">
                            <r-icon icon="caret-double-left"/>
                        </r-icon-button>
                        <r-icon-button @click="moveToPreviousPage" :disabled="!canMoveBackward">
                            <r-icon icon="caret-left"/>
                        </r-icon-button>
                        <r-button @click="moveToPage(p.id)"
                                  :type="p.id === page ? 'primary' : 'default'"
                                  v-for="p in pages"
                                  :key="p.id">
                            {{p.id}}
                        </r-button>
                        <template v-if="reachedMaxPagination">
                            <div v-tooltip="{text: `Please refine your search to find the results you're looking for`}">
                                <r-icon-button disabled>
                                    <r-icon icon="caret-right"/>
                                </r-icon-button>
                                <r-icon-button disabled>
                                    <r-icon icon="caret-double-right"/>
                                </r-icon-button>
                            </div>
                        </template>
                        <template v-else>
                            <r-icon-button @click="moveToNextPage" :disabled="!canMoveForward">
                                <r-icon icon="caret-right"/>
                            </r-icon-button>
                            <r-icon-button @click="moveToLastPage" :disabled="!canMoveForward">
                                <r-icon icon="caret-double-right"/>
                            </r-icon-button>
                        </template>
                    </r-button-group>
                </div>
                <div class="r-grid-item r-pagination-input">
                    <r-input ref="gotoInput"
                             numeric
                             left-label="Go to"
                             class="inline-xs"
                             right-icon="arrow-right"
                             :right-icon-click-pointer="true"
                             @right-icon-click="moveToPageInput"
                             @key-submit="moveToPageInput"
                             v-model="page"
                             submitOnEnter
                    />
                </div>
            </div>
        </template>
        <template v-else-if="!expanded && showPagination">
            <r-button-group>
                <r-icon-button :disabled="!canMoveBackward" @click="moveToPreviousPage">
                    <r-icon slot="left-icon" icon="arrow-left"></r-icon>
                    Prev
                </r-icon-button>
                <template v-if="reachedMaxPagination">`
                    <div v-tooltip="{text: `Please refine your search to find the results you're looking for`}">
                        <r-icon-button disabled>
                            <r-icon slot="right-icon" icon="arrow-right"/>
                            Next
                        </r-icon-button>
                    </div>
                </template>
                <template v-else>
                    <r-icon-button :disabled="!canMoveForward"
                                   @click="moveToNextPage">
                        <r-icon slot="right-icon" icon="arrow-right"/>
                        Next
                    </r-icon-button>
                </template>
            </r-button-group>
        </template>
        <slot name="paginationLabel"
              :startingRecord="startingRecord"
              :endingRecord="endingRecord"
              :total="total">
            <template v-if="!expanded && showPagination">
                <span class="text-muted">{{startingRecord}}-{{endingRecord}} of {{total}}
                </span>
            </template>
            <template v-else-if="!showPagination">
                <span class="r-text-muted" v-if="total === 1">{{total}} record</span>
                <span class="r-text-muted" v-if="total > 1">{{total}} records</span>
            </template>
        </slot>
    </div>
</template>

<script>
    const MAX_NAVIGABLE_PAGINATION = 1000;
    const MAX_NUMBER_PAGES = 50;

    export default {
        name: 'r-pagination-control',
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
        data() {
            return {
                maxPageCount: 5,
                pageCountPerExtreme: 2,
                page: null,
            };
        },
        computed: {
            currentOffset() {
                return (this.page - 1) * this.limit;
            },
            totalPages() {
                if (Math.ceil(this.total / this.limit) < 50) {
                    return Math.ceil(this.total / this.limit);
                }
                return MAX_NUMBER_PAGES;
            },
            startingRecord() {
                return this.currentOffset + 1;
            },
            endingRecord() {
                const upperLimit = this.currentOffset + this.limit;
                return upperLimit < this.total ? upperLimit : this.total;
            },
            canMoveBackward() {
                return this.page > 1;
            },
            canMoveForward() {
                return !this.reachedMaxPagination && this.morePagesAvailable;
            },
            morePagesAvailable() {
                return this.page < this.totalPages;
            },
            reachedMaxPagination() {
                return this.endingRecord >= MAX_NAVIGABLE_PAGINATION;
            },
            pages() {
                const pages = [];
                let startPage = this.page;
                let endPage = startPage + this.maxPageCount - 1;

                if (startPage < this.maxPageCount && (startPage / 2 < this.pageCountPerExtreme)) {
                    startPage = 1;
                    endPage = this.totalPages < this.maxPageCount ? this.totalPages : this.maxPageCount;
                } else if (endPage >= this.totalPages + this.pageCountPerExtreme) {
                    endPage = this.totalPages;
                    startPage = this.totalPages - this.maxPageCount + 1;
                } else if (endPage > this.maxPageCount) {
                    endPage = startPage + this.pageCountPerExtreme;
                    startPage -= this.pageCountPerExtreme;
                }
                // check for edge cases at the start
                if (startPage < 1) {
                    startPage = 1;
                }
                // and at the end
                if (endPage > this.totalPages) {
                    endPage = this.totalPages;
                }
                // generate list based on extremes
                /* eslint-disable no-plusplus */
                for (let i = startPage; i <= endPage; i++) {
                    pages.push({id: i});
                }

                return pages;
            },
            pagination() {
                return {
                    hasPagination: this.hasPagination,
                    offset: this.currentOffset,
                };
            },
        },
        created() {
            this.navigate(Math.floor(this.offset / this.limit) + 1);
        },
        methods: {
            moveToPage(id) {
                this.navigate(id);
            },
            moveToPageInput() {
                this.navigate(this.page);
            },
            moveToFirstPage() {
                this.navigate(1);
            },
            moveToPreviousPage() {
                this.navigate(this.page - 1);
            },
            moveToNextPage() {
                this.navigate(this.page + 1);
            },
            moveToLastPage() {
                this.navigate(this.totalPages);
            },
            navigate(page) {
                if (page > this.totalPages) {
                    this.page = this.totalPages;
                } else if (page > MAX_NUMBER_PAGES) {
                    this.page = MAX_NUMBER_PAGES;
                } else if (page <= 0) {
                    this.page = 1;
                } else {
                    this.page = page;
                }
                /**
                 * Offset change by element click or from parent component
                 * @type {Event}
                 */
                this.$emit('navigate', this.currentOffset);
            },
        },
    };
</script>

<style lang="scss">
    @import './r-pagination-control.scss';
</style>
