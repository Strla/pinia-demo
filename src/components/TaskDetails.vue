<script setup lang="ts">
import { type Task, useTaskStore } from '@/stores/taskStore'

interface TaskDetailsProps {
  task: Task
}
const { task } = defineProps<TaskDetailsProps>()

const taskStore = useTaskStore()
const { deleteTask, toggleTaskFavorite } = taskStore
</script>

<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <i class="material-icons" @click="deleteTask(task.id)">delete</i>
      <i
        class="material-icons"
        @click="toggleTaskFavorite(task.id)"
        :class="{ active: task.isFavorite }"
        >favorite</i
      >
    </div>
  </div>
</template>

<style scoped></style>
