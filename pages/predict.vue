<template>
  <div class="min-h-screen bg-gray-100">
    <div class="flex flex-col h-screen">
      <!-- 图表区域 -->
      <div class="flex-grow">
        <StockChart />
      </div>
      
      <!-- 底部面板 -->
      <div class="h-1/3 flex gap-4 p-4 bg-white border-t">
        <div class="w-2/3">
          <IndicatorPanel />
        </div>
        <div class="w-1/3">
          <PredictionPanel />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import StockChart from '~/components/predict/StockChart.vue'
import IndicatorPanel from '~/components/predict/IndicatorPanel.vue'
import PredictionPanel from '~/components/predict/PredictionPanel.vue'
</script> 