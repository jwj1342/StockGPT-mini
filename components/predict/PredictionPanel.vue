<template>
  <div class="h-full p-4 bg-white rounded-lg shadow">
    <h3 class="text-lg font-medium mb-4">预测设置</h3>
    
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">预测天数</label>
        <UInput
          v-model="prediction.days"
          type="number"
          min="1"
          max="30"
          class="mt-1"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">预测算法</label>
        <USelect
          v-model="prediction.algorithm"
          :options="algorithms"
          class="mt-1"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">置信区间</label>
        <USlider
          v-model="prediction.confidence"
          :min="0.8"
          :max="0.99"
          :step="0.01"
          class="mt-1"
        />
      </div>

      <UButton
        color="primary"
        block
        @click="runPrediction"
      >
        运行预测
      </UButton>
    </div>

    <div class="mt-4">
      <h4 class="text-sm font-medium text-gray-700 mb-2">预测结果</h4>
      <div class="space-y-2">
        <div 
          v-for="(price, day) in predictionResults" 
          :key="day"
          class="flex justify-between items-center"
        >
          <span>Day {{ day + 1 }}</span>
          <span 
            :class="price.change >= 0 ? 'text-green-500' : 'text-red-500'"
          >
            {{ price.value }}
            <small>({{ price.change >= 0 ? '+' : '' }}{{ price.change }}%)</small>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useStockStore } from '~/stores/stock'

const store = useStockStore()

const algorithms = [
  { label: 'LSTM', value: 'lstm' },
  { label: 'ARIMA', value: 'arima' },
  { label: 'Prophet', value: 'prophet' }
]

const prediction = reactive({
  days: 5,
  algorithm: 'lstm',
  confidence: 0.95
})

// 模拟预测结果
const predictionResults = ref([
  { value: '102.34', change: 1.2 },
  { value: '103.56', change: 1.1 },
  { value: '102.89', change: -0.6 },
  { value: '104.23', change: 1.3 },
  { value: '105.67', change: 1.4 }
])

const runPrediction = () => {
  store.updatePrediction(prediction)
  // 这里添加实际的预测逻辑
}
</script> 