import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {
  if (process.client) {
    const { default: ECharts } = await import('vue-echarts')
    const { use } = await import('echarts/core')
    const { CandlestickChart, LineChart, BarChart } = await import('echarts/charts')
    const {
      GridComponent,
      TooltipComponent,
      LegendComponent,
      DataZoomComponent
    } = await import('echarts/components')
    const { CanvasRenderer } = await import('echarts/renderers')

    use([
      CandlestickChart,
      LineChart,
      BarChart,
      GridComponent,
      TooltipComponent,
      LegendComponent,
      DataZoomComponent,
      CanvasRenderer
    ])

    nuxtApp.vueApp.component('VChart', ECharts)
  }
}) 