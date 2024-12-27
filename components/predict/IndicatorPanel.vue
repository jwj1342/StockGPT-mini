<template>
  <div class="h-full p-4 bg-white rounded-lg shadow">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-medium">技术指标</h3>
      <div class="space-x-2">
        <UButton 
          v-for="(enabled, name) in store.indicators" 
          :key="name"
          :color="enabled ? 'primary' : 'gray'"
          @click="store.toggleIndicator(name)"
        >
          {{ name.toUpperCase() }}
        </UButton>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-4">
      <div 
        v-for="indicator in indicators" 
        :key="indicator.name"
        class="p-4 rounded-lg bg-gray-50"
      >
        <div class="text-sm text-gray-500">{{ indicator.name }}</div>
        <div class="text-xl font-semibold">{{ indicator.value }}</div>
        <div 
          class="text-sm"
          :class="indicator.change >= 0 ? 'text-green-500' : 'text-red-500'"
        >
          {{ indicator.change >= 0 ? '+' : '' }}{{ indicator.change }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStockStore } from '~/stores/stock'

const store = useStockStore()

// 模拟技术指标数据
const indicators = ref([
  { name: 'RSI', value: '56.78', change: 2.3 },
  { name: 'MACD', value: '1.234', change: -0.5 },
  { name: 'KDJ', value: '75.43', change: 1.2 },
  { name: '布林带', value: '103.45', change: -1.8 },
  { name: '成交量', value: '12.3M', change: 5.6 },
  { name: '换手率', value: '2.34%', change: 0.3 },
  { name: '振幅', value: '3.45%', change: 1.1 },
  { name: '量比', value: '1.23', change: -0.7 }
])
</script> 