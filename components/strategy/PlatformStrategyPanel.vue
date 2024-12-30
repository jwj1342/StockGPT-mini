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

      <div v-if="hasSelectedStocks" class="bg-gray-50 p-4 rounded-lg">
        <h4 class="font-medium mb-2">平台策略建议</h4>
        <p class="text-gray-600">{{ strategyAdvice }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { STOCK_OPTIONS } from '~/constants/stocks'

const emit = defineEmits(['update-data'])

const selectedDate = ref(new Date().toISOString().split('T')[0])
const expectedProfit = ref('2,345.67')

const stockOptions = [
  { label: '贵州茅台 (600519)', value: '600519' },
  { label: '腾讯控股 (00700)', value: '00700' },
  { label: '阿里巴巴 (09988)', value: '09988' },
  { label: '中国平安 (601318)', value: '601318' },
  { label: '招商银行 (600036)', value: '600036' },
  { label: '五粮液 (000858)', value: '000858' },
  { label: '美团-W (03690)', value: '03690' },
  { label: '比亚迪 (002594)', value: '002594' },
  { label: '宁德时代 (300750)', value: '300750' },
  { label: '工商银行 (601398)', value: '601398' }
]

const selectedStocks = ref([
  { code: null, volume: '' }
])

const addStock = () => {
  if (selectedStocks.value.length < 5) {
    selectedStocks.value.push({ code: null, volume: '' })
  }
}

const removeStock = (index: number) => {
  selectedStocks.value.splice(index, 1)
}

const hasSelectedStocks = computed(() => {
  return selectedStocks.value.some(stock => stock.code !== null)
})

const strategyAdvice = computed(() => {
  if (!hasSelectedStocks.value) return ''
  return '根据技术分析，建议在当前价位买入，目标价位上涨8%，止损位下跌3%。'
})

// 监听股票选择和交易量变化
watch(selectedStocks, (newStocks) => {
  const chartData = Array(8).fill(0)
  newStocks.forEach(stock => {
    if (stock.code && stock.volume) {
      const volume = parseInt(stock.volume)
      chartData.forEach((_, index) => {
        chartData[index] += Math.random() > 0.5 ? volume : -volume
      })
    }
  })
  emit('update-data', chartData)
}, { deep: true })
</script> 