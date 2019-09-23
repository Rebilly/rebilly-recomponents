<template>
  <div class="container">
    <div>
      <h1 class="title">
        Lazy Loading
      </h1>
      <div>
        <lazy-loading-image />
      </div>
    </div>
  </div>
</template>

<script>
import LazyLoadingImage from '~/components/LazyLoadingImage.vue'

export default {
  components: {
    LazyLoadingImage
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
