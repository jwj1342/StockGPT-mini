<template>
  <div class="h-full bg-white rounded-lg shadow">
    <!-- 图例区域 -->
    <div class="flex items-center gap-6 p-4 border-b">
      <div 
        v-for="(legend, index) in legends" 
        :key="index"
        class="flex items-center gap-2 cursor-pointer"
        @click="toggleSeries(index)"
      >
        <UCheckbox 
          v-model="legend.show"
          :color="legend.color"
        />
        <span class="text-sm text-gray-600">{{ legend.name }}</span>
        <!-- 添加颜色块 -->
        <div 
          class="w-4 h-4 rounded"
          :style="{ backgroundColor: legend.color, opacity: legend.show ? 1 : 0.3 }"
        ></div>
      </div>
    </div>
    
    <!-- 图表区域 -->
    <div ref="chartRef" class="w-full h-[calc(100%-60px)]"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

// 图例配置
const legends = ref([
  { name: '个性化交易策略', show: true, color: '#60A5FA' },
  { name: '用户交易量', show: true, color: '#34D399' },
  { name: '平台策略历史收益', show: true, color: '#F59E0B' }
])

// 模拟数据 - 包含正负值
const xAxisData = ['09:30', '10:00', '10:30', '11:00', '13:30', '14:00', '14:30', '15:00']
const customStrategyData = [2300, -1800, 3200, -2900, 3500, -2800, 3600, 4000]
const userTradeData = [-1800, 2200, -2500, 2300, -2800, 3000, -2900, 3200]
const platformStrategyData = [2500, -3000, 3500, -3200, 3800, -3200, 4000, -4500]

// 切换系列显示状态
const toggleSeries = (index: number) => {
  legends.value[index].show = !legends.value[index].show
  updateChart()
}

// 更新图表配置
const updateChart = () => {
  if (!chart) return

  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: (params: any) => {
        return params.map((param: any) => {
          const value = Math.abs(param.value)
          const type = param.value >= 0 ? '买入' : '卖出'
          return `${param.seriesName}<br/>${type}: ${value}元`
        }).join('<br/><br/>')
      }
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100
      },
      {
        type: 'slider',
        start: 0,
        end: 100
      }
    ],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%', // 为缩放条留出空间
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value',
      name: '交易量(元)',
      nameTextStyle: {
        padding: [0, 0, 0, 40]
      },
      axisLabel: {
        formatter: (value: number) => {
          return Math.abs(value)
        }
      }
    },
    series: legends.value.map((legend, index) => {
      const data = index === 0 ? customStrategyData : 
                  index === 1 ? userTradeData : 
                  platformStrategyData
      
      return {
        name: legend.name,
        type: 'bar',
        barWidth: '20%',
        itemStyle: {
          color: legend.color
        },
        data: legend.show ? data : [], // 根据图例状态显示或隐藏数据
        show: legend.show
      }
    })
  }

  chart.setOption(option)
}

// 监听图例变化
watch(legends, () => {
  updateChart()
}, { deep: true })

// 接收来自父组件的数据更新
const props = defineProps<{
  customStrategyData?: number[]
  userTradeData?: number[]
  platformStrategyData?: number[]
}>()

// 监听属性变化
watch(() => props.customStrategyData, (newVal) => {
  if (newVal) {
    customStrategyData.splice(0, customStrategyData.length, ...newVal)
    updateChart()
  }
}, { deep: true })

watch(() => props.userTradeData, (newVal) => {
  if (newVal) {
    userTradeData.splice(0, userTradeData.length, ...newVal)
    updateChart()
  }
}, { deep: true })

watch(() => props.platformStrategyData, (newVal) => {
  if (newVal) {
    platformStrategyData.splice(0, platformStrategyData.length, ...newVal)
    updateChart()
  }
}, { deep: true })

// 在 script setup 中添加
const resize = () => {
  if (chart) {
    chart.resize()
  }
}

// 暴露 resize 方法给父组件
defineExpose({
  resize
})

// 修改 onMounted 部分
onMounted(() => {
  if (chartRef.value) {
    chart = echarts.init(chartRef.value)
    updateChart()

    // 使用 ResizeObserver 监听容器大小变化
    const resizeObserver = new ResizeObserver(() => {
      chart?.resize()
    })
    
    resizeObserver.observe(chartRef.value)

    // 清理函数
    onUnmounted(() => {
      resizeObserver.disconnect()
      chart?.dispose()
    })
  }
})
</script>

<style scoped>
/* 添加过渡效果 */
.w-4 {
  transition: opacity 0.2s ease-in-out;
}
</style> 