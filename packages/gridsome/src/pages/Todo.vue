<template>
  <Layout>
    <div class="container">
      <div>
        <h1 class="title">
          Todo List
        </h1>
        <div class="avatar">
          <r-avatar initials="AU" color="green">
            <p>Awesome user</p>
          </r-avatar>
        </div>
        <div>
          <todo />
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Todo from '~/components/Todo.vue'

export default {
  components: {
    Todo
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

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
}
</style>
