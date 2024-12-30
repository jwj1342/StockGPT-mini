<template>
  <div class="h-full bg-white rounded-lg shadow p-4">
    <h3 class="text-lg font-medium mb-4">用户交易量</h3>
    
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

      <!-- 股票选择区域 - 优化滚动区域样式 -->
      <div class="bg-gray-50 rounded-lg p-3">
        <div class="h-[140px] overflow-y-auto pr-2 custom-scrollbar">
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
          </div>
        </div>
        
        <!-- 添加按钮 -->
        <div class="mt-3">
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedDate = ref(new Date().toISOString().split('T')[0])
const expectedProfit = ref('1,234.56')

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
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #CBD5E0 #EDF2F7;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #EDF2F7;
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #CBD5E0;
  border-radius: 2px;
  &:hover {
    background-color: #A0AEC0;
  }
}

/* 确保滚动区域内容不会被截断 */
.custom-scrollbar > div {
  padding-right: 1px;
}
</style> 