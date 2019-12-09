<template>
  <r-tile class="Payment">
    <template v-slot:primary>
      <r-input
        v-model="name"
        @key-submit="add"
        placeholder="What needs to be done"
      />
    </template>
    <template v-slot:secondary>
      <div v-for="todo in filtered" :key="todo.name">
        <r-icon-button @click="done(todo.name)">
          <r-icon slot="left-icon" :icon="todo.done ? 'check-s' : 'plus'" />
          {{ todo.name }}
        </r-icon-button>
      </div>
    </template>
    <template v-slot:actions>
      <r-radio v-model="view" label="All" value="all" />
      <r-radio v-model="view" label="Active" value="active" />
      <r-radio v-model="view" label="Completed" value="completed" />
    </template>
  </r-tile>
</template>

<script>
export default {
  data() {
    return {
      view: 'all',
      name: '',
      todos: []
    }
  },
  computed: {
    filtered() {
      if (this.view === 'active') {
        return this.todos.filter((todo) => !todo.done)
      } else if (this.view === 'completed') {
        return this.todos.filter((todo) => todo.done)
      }
      return this.todos
    }
  },
  methods: {
    add() {
      this.todos.push({
        name: this.name,
        done: false
      })
      this.name = ''
    },
    done(name) {
      this.todos.find((todo) => todo.name === name).done = true
    }
  }
}
</script>

<style>
.Payment {
  max-width: 400px;
}
.PaymentRow {
  margin: 1rem 0;
}
</style>
