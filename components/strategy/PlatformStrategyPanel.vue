<template>
  <div class="h-full bg-white rounded-lg shadow p-4">
    <h3 class="text-lg font-medium mb-4">平台策略历史收益</h3>
    
    <div class="space-y-4">
      <div class="flex gap-4">
        <UFormGroup label="日期" class="flex-1">
          <UInput 
            v-model="selectedDate" 
            type="date"
            :min="'2024-01-01'"
            :max="'2024-12-31'"
            @update:modelValue="generateTradeData"
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
          <div class="w-32 px-3 py-1.5 bg-gray-50 rounded border text-gray-600">
            {{ stock.volume ? `${stock.volume}股` : '-' }}
          </div>
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
const stockOptions = STOCK_OPTIONS

const selectedStocks = ref([
  { code: null, volume: '' }
])

// 生成交易量数据
const generateTradeData = () => {
  // 为每只选中的股票生成交易量
  selectedStocks.value.forEach(stock => {
    if (stock.code) {
      // 生成一个基于股票代码的固定交易量
      const baseVolume = parseInt(stock.code.slice(-4))
      stock.volume = (baseVolume * 10).toString()
    } else {
      stock.volume = ''
    }
  })

  // 生成图表数据
  const chartData = Array(8).fill(0)
  selectedStocks.value.forEach(stock => {
    if (stock.code && stock.volume) {
      const volume = parseInt(stock.volume)
      chartData.forEach((_, index) => {
        // 生成交易数据
        chartData[index] += index % 2 === 0 ? volume : -volume
      })
    }
  })

  // 更新预期收益
  const totalProfit = chartData.reduce((sum, val) => sum + Math.abs(val), 0) * 0.1
  expectedProfit.value = totalProfit.toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  emit('update-data', chartData)
}

// 监听股票选择变化
watch(() => selectedStocks.value.map(s => s.code), () => {
  generateTradeData()
}, { deep: true })

const addStock = () => {
  if (selectedStocks.value.length < 5) {
    selectedStocks.value.push({ code: null, volume: '' })
    generateTradeData()
  }
}

const removeStock = (index: number) => {
  selectedStocks.value.splice(index, 1)
  generateTradeData()
}

const hasSelectedStocks = computed(() => {
  return selectedStocks.value.some(stock => stock.code !== null)
})

const strategyAdvice = computed(() => {
  if (!hasSelectedStocks.value) return ''
  return '根据技术分析，建议在当前价位买入，目标价位上涨8%，止损位下跌3%。'
})

// 初始化时生成一次数据
generateTradeData()
</script> 