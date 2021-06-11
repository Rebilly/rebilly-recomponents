<template>
    <div>
        <template v-if="Array.isArray(value)">
            <r-badge v-for="(data, index) in value" :key="index" :type="badgeType" class="r-mr-s">
                {{data}}
            </r-badge>
        </template>
        <template v-else>
            <r-badge :type="badgeType" class="r-mr-s">
                {{value}}
            </r-badge>
        </template>
    </div>
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
    badgeType() {
      const { type } = this.column.renderOptions || {};
      return type;
    },
  },
};
</script>
