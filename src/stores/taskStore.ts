import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import * as uuid from 'uuid'

export interface Task {
  id: number
  title: string
  isFavorite: boolean
}

export const useTaskStore = defineStore('task', () => {
  // State
  const tasks = ref<Task[]>([
    { id: 1, title: 'Buy some milk', isFavorite: false },
    { id: 2, title: 'Play Gloomhaven', isFavorite: true }
  ])

  // Getters
  const getFavoriteTasks = computed(() => tasks.value.filter((task) => task.isFavorite))
  const getFavoriteCount = computed(() => getFavoriteTasks.value.length)
  const getTotalCount = computed(() => tasks.value.length)

  // Actions
  function addTask(name: string) {
    const newTask = { id: uuid.v4(), title: name, isFavorite: false }
    tasks.value.push(newTask)
  }

  function deleteTask(id: number) {
    const index = tasks.value.findIndex((task) => task.id === id)
    tasks.value.splice(index, 1)
  }

  function toggleTaskFavorite(id: number) {
    const task = tasks.value.find((task) => task.id === id)
    if (task) {
      task.isFavorite = !task.isFavorite
    }
  }

  return {
    tasks,
    addTask,
    deleteTask,
    toggleTaskFavorite,
    getFavoriteTasks,
    getFavoriteCount,
    getTotalCount
  }
})
