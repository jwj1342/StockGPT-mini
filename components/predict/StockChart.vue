<template>
  <div class="w-full h-full p-4">
    <ClientOnly>
      <VChart v-if="mounted" class="w-full h-full" :option="chartOption" autoresize />
      <template #fallback>
        <ChartLoading />
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useStockStore } from '~/stores/stock'
import type { EChartsOption } from 'echarts'
import ChartLoading from './ChartLoading.vue'

const mounted = ref(false)
const store = useStockStore()

onMounted(() => {
  mounted.value = true
})

const chartOption = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30', '成交量']
  },
  grid: [
    {
      left: '10%',
      right: '8%',
      height: '60%'
    },
    {
      left: '10%',
      right: '8%',
      top: '75%',
      height: '20%'
    }
  ],
  xAxis: [
    {
      type: 'category',
      data: store.stockData.map(item => item.date),
      scale: true,
      boundaryGap: false,
      axisLine: { onZero: false },
      splitLine: { show: false },
      min: 'dataMin',
      max: 'dataMax'
    },
    {
      type: 'category',
      gridIndex: 1,
      data: store.stockData.map(item => item.date),
      scale: true,
      boundaryGap: false,
      axisLine: { onZero: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      min: 'dataMin',
      max: 'dataMax'
    }
  ],
  yAxis: [
    {
      scale: true,
      splitArea: {
        show: true
      }
    },
    {
      scale: true,
      gridIndex: 1,
      splitNumber: 2,
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    }
  ],
  dataZoom: [
    {
      type: 'inside',
      xAxisIndex: [0, 1],
      start: 50,
      end: 100
    },
    {
      show: true,
      xAxisIndex: [0, 1],
      type: 'slider',
      top: '97%',
      start: 50,
      end: 100
    }
  ],
  series: [
    {
      name: '日K',
      type: 'candlestick',
      data: store.stockData.map(item => [
        item.open,
        item.close,
        item.low,
        item.high
      ])
    },
    {
      name: 'MA5',
      type: 'line',
      data: store.ma5,
      smooth: true,
      lineStyle: {
        opacity: 0.5
      }
    },
    {
      name: 'MA10',
      type: 'line',
      data: store.ma10,
      smooth: true,
      lineStyle: {
        opacity: 0.5
      }
    },
    {
      name: '成交量',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: store.stockData.map(item => item.volume)
    }
  ]
}))
</script> 