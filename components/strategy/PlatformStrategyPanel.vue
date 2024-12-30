<template>
  <div class="h-full bg-white rounded-lg shadow p-4">
    <h3 class="text-lg font-medium mb-4">平台策略历史收益</h3>
    
    <div class="space-y-4">
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

      <div>
        <USelect
          v-model="selectedStock"
          :options="stockOptions"
          placeholder="选择股票"
        />
      </div>

      <div v-if="selectedStock" class="bg-gray-50 p-4 rounded-lg">
        <h4 class="font-medium mb-2">平台策略建议</h4>
        <p class="text-gray-600">{{ strategyAdvice }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const selectedDate = ref(new Date().toISOString().split('T')[0])
const selectedStock = ref(null)
const expectedProfit = ref('2,345.67')

const stockOptions = [
  { label: '贵州茅台 (600519)', value: '600519' },
  { label: '腾讯控股 (00700)', value: '00700' },
  { label: '阿里巴巴 (09988)', value: '09988' }
]

const strategyAdvice = computed(() => {
  if (!selectedStock.value) return ''
  return '根据技术分析，建议在当前价位买入，目标价位上涨8%，止损位下跌3%。'
})
</script> 