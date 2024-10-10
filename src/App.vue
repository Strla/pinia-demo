<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'
import { ref } from 'vue'
import TaskDetails from '@/components/TaskDetails.vue'
import { storeToRefs } from 'pinia'
import TaskForm from '@/components/TaskForm.vue'

const taskStore = useTaskStore()
taskStore.getTasks()
const {
  tasks: allTasks,
  getFavoriteTasks: favoriteTasks,
  getFavoriteCount: favoriteCount,
  getTotalCount: totalCount,
  isLoading
} = storeToRefs(taskStore)

const filter = ref<'all' | 'favorites'>('all')
</script>

<template>
  <main>
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo" />
      <h1>Pinia Tasks</h1>
    </header>

    <div class="new-task-form">
      <TaskForm />
    </div>

    <nav class="filter">
      <button @click="filter = 'all'">All Tasks</button>
      <button @click="filter = 'favorites'">Favorite Tasks</button>
    </nav>

    <div class="loading" v-if="isLoading">Loading tasks...</div>

    <div class="task-list" v-if="filter === 'all'">
      <p>All Tasks</p>
      <p>You have {{ totalCount }} {{ totalCount === 1 ? 'task' : 'tasks' }} left to do</p>
      <div v-for="task in allTasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
    <div class="task-list" v-if="filter === 'favorites'">
      <p>Favorite Tasks</p>
      <p>You have {{ favoriteCount }} {{ favoriteCount === 1 ? 'task' : 'tasks' }} left to do</p>
      <div v-for="task in favoriteTasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <!--    <button @click="taskStore.$reset">Reset</button>-->
  </main>
</template>
