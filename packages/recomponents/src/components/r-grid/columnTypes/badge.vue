<template>
    <div v-if="Array.isArray(value)">
        <span class="badge" style="margin-right: 0.25em;" :style="badgeStyle" v-for="(data, index) in value" :key="index">
            {{data}}
        </span>
    </div>
    <span class="badge" :style="badgeStyle" v-else>
        {{value}}
    </span>
</template>

<script>
    /**
     * renderOptions:
     *      backgroundColor: a color value for the background-color of the badge
     *      color: a color value for the color of the badge text
     *      styles: an object for additional styles for the badge
     *
     * If column value is an array, place each item of that array inside a badge,
     * otherwise add the column value in the badge.
     */
    export default {
        name: 'badge',
        props: {
            value: {
                required: true,
            },
            row: {
                required: true,
            },
            column: {
                required: true,
            },
        },
        computed: {
            badgeStyle() {
                if (this.column.renderOptions) {
                    const backgroundColor = this.column.renderOptions.backgroundColor || null;
                    const color = this.column.renderOptions.color || null;
                    const styles = this.column.renderOptions.styles || {};

                    return {
                        backgroundColor,
                        color,
                        ...styles,
                    };
                }
                return null;
            },
        },
    };
</script>
