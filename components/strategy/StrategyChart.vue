<template>
  <div class="w-full h-full bg-white rounded-lg shadow p-4">
    <ClientOnly>
      <VChart v-if="mounted" class="w-full h-full" :option="chartOption" autoresize />
      <template #fallback>
        <div class="w-full h-full flex items-center justify-center">
          <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin" />
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { ECOption } from 'echarts'

const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})

// 生成一个月的模拟数据
const generateMonthData = () => {
  const data = []
  const startDate = new Date('2024-01-01')
  for (let i = 0; i < 31; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    
    // 生成-3到3之间的随机值，保留一位小数
    const value = (Math.random() * 6 - 3).toFixed(1)
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: parseFloat(value)
    })
  }
  return data
}

const data = generateMonthData()

const chartOption = computed<ECOption>(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: (params: any) => {
      const param = params[0]
      return `${param.name}<br/>
              ${param.value >= 0 ? '买入' : '卖出'}: ${Math.abs(param.value)}`
    }
  },
  grid: {
    top: 60,
    bottom: 60,
    left: 80,
    right: 40
  },
  xAxis: {
    type: 'category',
    data: data.map(item => item.date),
    axisLine: { onZero: true },
    axisTick: { alignWithLabel: true },
    axisLabel: {
      rotate: 45,
      formatter: (value: string) => {
        return value.slice(5) // 只显示月-日
      }
    }
  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed'
      }
    },
    axisLabel: {
      formatter: (value: number) => {
        return Math.abs(value).toFixed(1)
      }
    }
  },
  dataZoom: [
    {
      type: 'slider',
      show: true,
      xAxisIndex: [0],
      start: 0,
      end: 100,
      height: 20
    },
    {
      type: 'inside',
      xAxisIndex: [0],
      start: 0,
      end: 100
    }
  ],
  series: [
    {
      type: 'bar',
      data: data.map(item => ({
        value: item.value,
        itemStyle: {
          color: item.value >= 0 ? '#67C23A' : '#F56C6C'
        }
      })),
      large: true,
      barWidth: '60%'
    }
  ],
  graphic: [
    {
      type: 'text',
      left: 30,
      top: '25%',
      style: {
        text: '买入',
        fontSize: 14,
        fill: '#67C23A'
      }
    },
    {
      type: 'text',
      left: 30,
      top: '75%',
      style: {
        text: '卖出',
        fontSize: 14,
        fill: '#F56C6C'
      }
    }
  ]
}))
</script> 