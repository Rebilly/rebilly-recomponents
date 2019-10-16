<template>
  <div class="container">
    <div>
      <h1 class="title">
        Multi-step Form
      </h1>
      <div>
        <multi-step-form />
      </div>
    </div>
  </div>
</template>

<script>
import MultiStepForm from '~/components/MultiStepForm.vue'

export default {
  components: {
    MultiStepForm
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
