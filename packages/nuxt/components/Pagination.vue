<template>
  <div>
    <p>
      <b>Current page:</b>
      {{ currentPage }}
    </p>
    <r-pagination
      :total="100"
      :limit="10"
      :total-visible="6"
      :provider="provider"
      @navigate="currentPage = $event"
    ></r-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: 1
    }
  },
  methods: {
    provider() {}
  }
}
</script>
<style></style>
