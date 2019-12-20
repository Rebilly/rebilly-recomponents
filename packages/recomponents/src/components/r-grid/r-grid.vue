<script>
    import Repeater from '../r-repeater/r-repeater.vue';
    import ColumnTypes from './columnTypes';

    export default {
        components: {
            Repeater,
        },
        props: {
            columns: {
                type: Object,
                required: true,
            },
            provider: {
                type: [Function, Array, Promise],
                required: true,
            },
        },
        computed: {
            computedColumns() {
                return this.columns.columns;
            },
            computedProvider() {
                return async () => {
                    if (Array.isArray(this.provider)) {
                        return this.provider;
                    }
                    if (this.provider instanceof Promise) {
                        // eslint-disable-next-line no-return-await
                        return await this.provider;
                    }
                    return this.provider;
                };
            },
        },
        data() {
            return {
                data: [],
            };
        },
        methods: {
            renderRepeaterHead(createElement) {
                if (this.$slots.columnsHeader) {
                    return createElement(
                        'template',
                        {slot: 'thead'}, // custom thead slot
                        [this.$slots.columnsHeader],
                    );
                }

                const columnHeaders = [];
                this.computedColumns.forEach((column) => {
                    let header;
                    if (typeof column.header === 'object') {
                        // eslint-disable-next-line prefer-destructuring
                        header = column.header;
                    } else if (typeof column.header === 'function') {
                        header = column.header({
                            createElement,
                            props: {
                                column,
                            },
                        });
                    } else {
                        header = column.label || column.name;
                    }
                    columnHeaders.push(createElement('th', {
                        style: column.style || null,
                        class: column.class || null,
                    }, header));
                });
                return createElement('template', {
                    slot: 'headers',
                }, [columnHeaders]);
            },
            renderEmpty(createElement) {
                return createElement('template', {
                    slot: 'empty',
                }, [this.$slots.empty || null]);
            },
            renderColgroup(createElement) {
                return createElement('template', {
                    slot: 'colgroup',
                }, [this.$slots.colgroup || null]);
            },
            renderRepeaterRow(createElement, prop) {
                const row = [];
                this.computedColumns.forEach((column) => {
                    if (column.renderAs) {
                        const component = typeof column.renderAs === 'string'
                            ? ColumnTypes[column.renderAs]
                            : column.renderAs;
                        if (typeof component === 'function') {
                            row.push(
                                createElement('td', {
                                    style: column.style || null,
                                    class: column.class || null,
                                }, [
                                    component({
                                        createElement,
                                        props: {
                                            row: prop.item,
                                            column,
                                            columns: this.columns,
                                            value: prop.item[column.name],
                                            emitRowAction: (name, data) => this.$emit(`table-row-action-${name}`, data),
                                        },
                                    }),
                                ]),
                            );
                        } else if (!component) {
                            throw new Error(`column component ${column.renderAs} not found`, column);
                        } else {
                            row.push(
                                createElement('td', {
                                    style: column.style || null,
                                    class: column.class || null,
                                }, [
                                    createElement(component, {
                                        props: {
                                            row: prop.item,
                                            column,
                                            columns: this.columns,
                                            value: prop.item[column.name],
                                            emitRowAction: (name, data) => this.$emit(`table-row-action-${name}`, data),
                                        },
                                    }),
                                ]),
                            );
                        }
                    } else {
                        row.push(createElement('td', {
                            style: column.style || null,
                            class: column.class || null,
                        }, prop.item[column.name]));
                    }
                });
                return createElement('tr', {
                    attr: {
                        key: prop.index,
                    },
                }, [row]);
            },
            renderRepeater(createElement) {
                return createElement(Repeater, {
                    class: 'r-grid-repeater',
                    props: {
                        provider: this.computedProvider,
                    },
                    scopedSlots: {
                        default: prop => this.renderRepeaterRow(createElement, prop),
                    },
                }, [
                    this.renderRepeaterHead(createElement),
                    this.renderColgroup(createElement),
                    this.renderEmpty(createElement),
                ]);
            },
        },
        render(createElement) {
            const componentStack = [];

            // If grid has a header, render that header
            if (this.$slots.header) {
                componentStack.push(
                    createElement('div', {
                        class: 'r-tile-content r-grid-header',
                    }, [this.$slots.header]),
                );
            }

            // render grid body
            componentStack.push(
                createElement('div', {
                    class: 'r-tile-content r-grid-body',
                }, [this.renderRepeater(createElement)]),
            );

            // If grid has a footer, render that footer
            if (this.$slots.footer) {
                componentStack.push(
                    createElement('div', {
                        class: 'r-tile-content r-grid-footer',
                    }, [this.$slots.footer]),
                );
            }

            // create grid
            return createElement('div', {
                class: 'r-tile r-grid',
            }, componentStack);
        },
    };
</script>

<style lang="scss">
    @import './r-grid.scss';
</style>
