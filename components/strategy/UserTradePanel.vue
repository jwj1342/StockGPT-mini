<template>
  <div class="h-full bg-white rounded-lg shadow p-4">
    <h3 class="text-lg font-medium mb-4">用户交易量</h3>
    
    <div class="space-y-4">
      <div class="flex gap-4">
        <UFormGroup label="交易量" class="flex-1">
          <UInput v-model="tradeVolume" type="number" />
        </UFormGroup>
        
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
        <span class="text-gray-600">总收益:</span>
        <span class="text-xl font-semibold text-primary-500">¥{{ totalProfit }}</span>
      </div>

      <div>
        <USelect
          v-model="selectedStock"
          :options="stockOptions"
          placeholder="选择股票"
        />
      </div>

      <div v-if="selectedStock">
        <UTextarea
          v-model="tradeNotes"
          placeholder="输入交易备注..."
          :rows="3"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tradeVolume = ref('')
const selectedDate = ref(new Date().toISOString().split('T')[0])
const selectedStock = ref(null)
const tradeNotes = ref('')
const totalProfit = ref('1,234.56')

const stockOptions = [
  { label: '贵州茅台 (600519)', value: '600519' },
  { label: '腾讯控股 (00700)', value: '00700' },
  { label: '阿里巴巴 (09988)', value: '09988' }
]
</script> 