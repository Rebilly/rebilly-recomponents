<template>
  <div class="container">
    <div>
      <h1 class="title">
        Payment Form
      </h1>
      <div>
        <pagination />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '~/components/Pagination.vue'

export default {
  components: {
    Pagination
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 3rem;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
