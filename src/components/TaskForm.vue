<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const { addTask } = useTaskStore()

const schema = yup.object({
  title: yup.string().required()
})
const { values, defineField, meta } = useForm({
  validationSchema: schema,
  initialValues: {
    title: ''
  }
})

const [title, titleAttrs] = defineField('title')

const handleSubmit = () => {
  addTask(values.title)
  title.value = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input
      type="text"
      name="title"
      id="title"
      placeholder="I need to..."
      v-model.trim="title"
      v-bind="titleAttrs"
    />
    <button :disabled="!meta.valid || !meta.dirty">Add</button>
  </form>
</template>

<style scoped>
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
