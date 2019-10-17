<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        Recomponents Nuxt Demo
      </h1>
      <div>
        <r-button type="primary" :push="{ path: '/todo' }">
          Todo list
        </r-button>
        <r-button type="primary" :push="{ path: '/payment' }">
          Payment form
        </r-button>
        <r-button type="primary" :push="{ path: '/lazy-loading' }">
          Lazy loading image
        </r-button>
        <r-button type="primary" :push="{ path: '/tabs' }">
          Tabs
        </r-button>
        <r-button type="primary" :push="{ path: '/multi-step-form' }">
          Multi-step Form
        </r-button>
        <r-button type="primary" :push="{ path: '/pagination' }">
          Pagination
        </r-button>
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
