import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import * as uuid from 'uuid'
import apiClient from '@/api/axios'

export interface Task {
  id: number | string
  title: string
  isFavorite: boolean
}

export const useTaskStore = defineStore('task', () => {
  // State
  const tasks = ref<Task[]>([])
  const isLoading = ref(false)

  // Getters
  const getFavoriteTasks = computed(() => tasks.value.filter((task) => task.isFavorite))
  const getFavoriteCount = computed(() => getFavoriteTasks.value.length)
  const getTotalCount = computed(() => tasks.value.length)

  // Actions
  async function getTasks() {
    isLoading.value = true
    try {
      const response = await apiClient.get('/tasks')
      tasks.value = response.data
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
    } finally {
      isLoading.value = false
    }
  }

  async function addTask(name: string) {
    const newTask = { id: uuid.v4(), title: name, isFavorite: false }
    tasks.value.push(newTask)

    try {
      await apiClient.post('/tasks', newTask)
    } catch (error) {
      console.error('Failed to add task:', error)
    }
  }

  async function deleteTask(id: number) {
    const index = tasks.value.findIndex((task) => task.id === id)
    tasks.value.splice(index, 1)

    try {
      await apiClient.delete(`/tasks/${id}`)
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }

  async function toggleTaskFavorite(id: number) {
    const task = tasks.value.find((task) => task.id === id)
    if (task) {
      task.isFavorite = !task.isFavorite
    }

    try {
      await apiClient.patch(`/tasks/${id}`, { isFavorite: task?.isFavorite })
    } catch (error) {
      console.error('Failed to toggle task favorite:', error)
    }
  }

  function $reset() {
    tasks.value = []
    isLoading.value = false
  }

  return {
    tasks,
    getTasks,
    addTask,
    deleteTask,
    toggleTaskFavorite,
    getFavoriteTasks,
    getFavoriteCount,
    getTotalCount,
    isLoading,
    $reset
  }
})
