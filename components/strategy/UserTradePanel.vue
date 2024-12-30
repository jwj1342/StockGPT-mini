<template>
  <div class="h-full bg-white rounded-lg shadow p-6">
    <div class="flex items-center gap-2 mb-6">
      <UIcon 
        name="i-heroicons-chart-bar-square" 
        class="w-6 h-6 text-primary-500"
      />
      <h3 class="text-xl font-medium">用户交易量</h3>
    </div>
    
    <div class="space-y-6">
      <div class="flex gap-4">
        <UFormGroup label="日期" class="flex-1">
          <UInput 
            :model-value="selectedDate" 
            type="date"
            :min="'2024-01-01'"
            :max="'2024-12-31'"
            @update:model-value="selectedDate = $event"
          />
        </UFormGroup>
      </div>

      <div class="flex items-center justify-between">
        <span class="text-gray-600">预期收益:</span>
        <span class="text-xl font-semibold text-green-500">¥{{ expectedProfit }}</span>
      </div>

      <div class="space-y-3">
        <div v-for="(stock, index) in selectedStocks" :key="index" class="flex gap-2">
          <USelect
            v-model="stock.code"
            :options="stockOptions"
            placeholder="选择股票"
            class="flex-1"
          />
          <UInput
            v-model="stock.volume"
            type="number"
            placeholder="交易量"
            class="w-32"
          />
          <UButton 
            color="red" 
            variant="soft" 
            icon="i-heroicons-trash"
            @click="removeStock(index)"
          />
        </div>
        <UButton 
          v-if="selectedStocks.length < 5"
          color="gray" 
          variant="soft" 
          @click="addStock"
          class="w-full"
        >
          添加股票（最多5只）
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { STOCK_OPTIONS } from '~/constants/stocks'

const emit = defineEmits(['update-data'])

const selectedDate = ref(new Date().toISOString().split('T')[0])
const expectedProfit = ref('1,234.56')
const stockOptions = STOCK_OPTIONS

const selectedStocks = ref([
  { code: null, volume: '' }
])

// 监听股票选择和交易量变化
watch(selectedStocks, (newStocks) => {
  // 将选择的股票数据转换为图表数据
  const chartData = Array(8).fill(0) // 8个时间点的数据
  newStocks.forEach(stock => {
    if (stock.code && stock.volume) {
      // 随机生成正负值，模拟买入卖出
      const volume = parseInt(stock.volume)
      chartData.forEach((_, index) => {
        chartData[index] += Math.random() > 0.5 ? volume : -volume
      })
    }
  })
  emit('update-data', chartData)
}, { deep: true })

const addStock = () => {
  if (selectedStocks.value.length < 5) {
    selectedStocks.value.push({ code: null, volume: '' })
  }
}

const removeStock = (index: number) => {
  selectedStocks.value.splice(index, 1)
}
</script> 