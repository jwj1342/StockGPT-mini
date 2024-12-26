<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">Playground</h3>
      </template>
      
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-4">
          <UTextarea
            v-model="input"
            rows="10"
            placeholder="在这里输入您的问题..."
          />
          <UButton color="primary" block>
            发送
          </UButton>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-gray-600">响应结果将在这里显示</p>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup>
const input = ref('');
</script> 