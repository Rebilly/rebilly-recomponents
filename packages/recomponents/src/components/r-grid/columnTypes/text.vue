<template functional>
    <span :class="props.column.renderOptions ? props.column.renderOptions.class : null">{{props.value}}</span>
</template>

<script>
    /**
     * Available renderOptions
     *      class: provide a class to be applied to the span wrapping the text
     */
</script>
