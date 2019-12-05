<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        Recomponents Nuxt Demo
      </h1>
      <div>
        <a
          class="r-button r-button--size-regular r-button--type-primary"
          href="/todo"
        >
          Todo list
        </a>
        <a
          class="r-button r-button--size-regular r-button--type-primary"
          href="/payment"
        >
          Payment form
        </a>
        <a
          class="r-button r-button--size-regular r-button--type-primary"
          href="/lazy-loading"
        >
          Lazy loading image
        </a>
        <a
          class="r-button r-button--size-regular r-button--type-primary"
          href="/tabs"
        >
          Tabs
        </a>
        <a
          class="r-button r-button--size-regular r-button--type-primary"
          href="/multi-step-form"
        >
          Multi-step Form
        </a>
        <a
          class="r-button r-button--size-regular r-button--type-primary"
          href="/pagination"
        >
          Pagination
        </a>
      </div>
      <div class="links">
        <a href="https://nuxtjs.org" target="_blank">
          Documentation
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
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

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
