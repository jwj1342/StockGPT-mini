import { defineNuxtPlugin } from '#app'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CandlestickChart, LineChart, BarChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

export default defineNuxtPlugin((nuxtApp) => {
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

  nuxtApp.vueApp.component('VChart', VChart)
}) 