# Grid

The `r-grid` component is designed to power the rendering of any tabular data and features configurable columns and automatic column formatting via colum types.

### Slots

This component has 5 optional slots:

* `header` **optional** the very top header, typically includes a title and some controls
* `columnsHeader` **optional** this will override what would normally be generated by the `columns` prop.
* `colgroup` **optional** for colgroups - see HTML `<colgroup>`
* `empty` **optional** for empty states (if the provider function returns no data)
* `footer` **optional** for the footer, typically where the pagination controls go

### Usage

#### CommonJS module

```html
<template>
    <r-pagination :provider="provider" :limit="limit" :total="total" :key="filter">
        <template #pagination="{pagination}">
            <r-grid :provider="pagination.provider" :columns="columns" :key="pagination.offset">
                <header slot="header">
                    <h2>Stuff</h2>
                </header>
                <section slot="empty">
                    <p>No stuff found.</p>
                </section>
                <footer slot="footer" v-if="pagination.hasPagination">
                    <r-pagination-control/>
                </footer>
            </r-grid>
        </template>
    </r-pagination>
</template>
<script>
    import Vue from 'vue'
    import '@rebilly/recomponents/dist/recomponents.css'
    import Recomponents from '@rebilly/recomponents'

    Vue.use(Recomponents)
</script>
```