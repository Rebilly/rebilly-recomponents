<template>
    <div>
        <!-- @slot Pagination component  -->
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
             * Wrapper for async pagination data provider
             */
    provider: {
      type: Function,
      required: true,
    },
    /**
             * Number of items handled by pagination in total
             */
    total: {
      type: Number,
      required: true,
    },
    /**
             * Number of items displayed on a single page
             */
    limit: {
      type: Number,
      required: true,
    },
    /**
             * Maximum number of displayed pages on screen, other pages will be hidden by …
             */
    totalVisible: {
      type: [Number, Boolean],
    },
    /**
             * Number of current active page
             */
    page: {
      type: [Number],
      default: 1,
    },
  },
  model: {
    prop: 'page',
    event: 'navigate',
  },
  data() {
    return {
      data: [],
      // TODO probably page as props value, to able to start with page from url query (or etc)
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
      /**
                 * Page change by element click or from parent component
                 * @type {Event}
                 */
      this.$emit('navigate', number);
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
      const items = {};
      const setPageItem = (index) => {
        const page = {
          content: index + 1,
          selected: index === (this.page - 1),
        };
        items[index] = page;
      };

      if (this.pages <= this.totalVisible) {
        for (let index = 0; index < this.pages; index += 1) {
          setPageItem(index);
        }
      } else {
        const half = Math.floor(this.totalVisible / 2);

        const setBreakView = (index) => {
          const breakView = { breakView: true };
          items[index] = breakView;
        };

        let left = 0;
        if (this.page - half > 0) {
          left = this.page - 1 - half;
        }

        let right = left + this.totalVisible - 1;
        if (right >= this.pages) {
          right = this.pages - 1;
          left = right - this.totalVisible + 1;
        }

        for (let i = left; i <= right && i <= this.pages - 1; i += 1) {
          setPageItem(i);
        }

        if (this.totalVisible > 0) {
          if (left > 0) {
            setBreakView(left - 1);
          }
          if (right + 1 < this.pages) {
            setBreakView(right + 1);
          }
        }

        for (let i = this.pages - 1; i >= this.pages; i -= 1) {
          setPageItem(i);
        }
      }
      return items;
    },
    pages() {
      let pages = Math.ceil(this.total / this.limit);
      if (pages < 0 || pages === Infinity) {
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
        provider: () => this.provider(this.page),
        offset: this.page,
        items: this.items,
      };
    },
  },
  mounted() {
    this.provider(this.page);
  },
  created() {
    this.$on('navigate', (page) => this.provider(page));
  },
};
</script>
