<template>
  <div class="h-full bg-white rounded-lg shadow p-4">
    <h3 class="text-lg font-medium mb-4">个性化交易策略</h3>
    
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
          v-if="selectedStocks.length < 3"
          color="gray" 
          variant="soft" 
          @click="addStock"
          class="w-full"
        >
          添加股票（最多3只）
        </UButton>
      </div>

      <div class="bg-gray-50 p-4 rounded-lg">
        <div class="flex justify-between items-center mb-2">
          <h4 class="font-medium">交易策略</h4>
          <UButton 
            size="sm" 
            color="primary" 
            variant="soft"
            @click="useAssistantStrategy"
          >
            使用助手策略
          </UButton>
        </div>
        <UTextarea
          v-model="strategyContent"
          rows="3"
          placeholder="输入您的交易策略..."
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedDate = ref(new Date().toISOString().split('T')[0])
const expectedProfit = ref('1,234.56')
const strategyContent = ref('')

const stockOptions = [
  { label: '贵州茅台 (600519)', value: '600519' },
  { label: '腾讯控股 (00700)', value: '00700' },
  { label: '阿里巴巴 (09988)', value: '09988' }
]

const selectedStocks = ref([
  { code: null, volume: '' }
])

const addStock = () => {
  selectedStocks.value.push({ code: null, volume: '' })
}

const removeStock = (index: number) => {
  selectedStocks.value.splice(index, 1)
}

const useAssistantStrategy = () => {
  // TODO: 从策略助手获取建议
  strategyContent.value = '根据技术分析，建议在当前价位买入，目标价位上涨8%，止损位下跌3%。'
}
</script> 