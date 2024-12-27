<template>
  <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex justify-between items-center">
    <div class="flex items-center space-x-4">
      <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
        <component :is="model.icon" class="w-6 h-6 text-primary-500" />
      </div>
      <div>
        <span class="font-medium text-gray-900">{{ model.name }}</span>
        <p class="text-sm text-gray-500">{{ model.shortDesc }}</p>
      </div>
    </div>
    <div class="flex space-x-3">
      <UButton size="sm" @click="$emit('view', model)">查看</UButton>
      <UButton size="sm" color="gray" variant="soft" @click="$emit('edit', model)">编辑</UButton>
    </div>
  </div>
</template>

<script setup>
defineProps({
  model: {
    type: Object,
    required: true
  }
})
</script> 