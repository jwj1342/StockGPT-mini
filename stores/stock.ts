import { defineStore } from 'pinia'

// 生成模拟的股票数据
function generateMockData(days = 100) {
  const basePrice = 100
  const data = []
  let price = basePrice
  
  for (let i = 0; i < days; i++) {
    const date = new Date()
    date.setDate(date.getDate() - (days - i))
    
    // 生成开高低收价格
    const open = price + (Math.random() - 0.5) * 2
    const close = open + (Math.random() - 0.5) * 4
    const high = Math.max(open, close) + Math.random() * 2
    const low = Math.min(open, close) - Math.random() * 2
    const volume = Math.floor(Math.random() * 10000000)
    
    data.push({
      date: date.toISOString().split('T')[0],
      open,
      high, 
      low,
      close,
      volume
    })
    
    price = close
  }
  
  return data
}

export const useStockStore = defineStore('stock', {
  state: () => ({
    stockData: generateMockData(),
    indicators: {
      ma5: true,
      ma10: true,
      ma20: false,
      ma30: false,
      volume: true
    },
    prediction: {
      days: 5,
      algorithm: 'lstm', // 'lstm' | 'arima' | 'prophet'
      confidence: 0.95
    }
  }),

  getters: {
    // 计算移动平均线
    ma5: (state) => {
      return calculateMA(5, state.stockData)
    },
    ma10: (state) => {
      return calculateMA(10, state.stockData) 
    },
    ma20: (state) => {
      return calculateMA(20, state.stockData)
    },
    ma30: (state) => {
      return calculateMA(30, state.stockData)
    }
  },

  actions: {
    toggleIndicator(name: string) {
      this.indicators[name] = !this.indicators[name]
    },
    
    updatePrediction(config: any) {
      this.prediction = {
        ...this.prediction,
        ...config
      }
    }
  }
})

// 计算移动平均线
function calculateMA(dayCount: number, data: any[]) {
  const result = []
  for (let i = 0; i < data.length; i++) {
    if (i < dayCount) {
      result.push('-')
      continue
    }
    let sum = 0
    for (let j = 0; j < dayCount; j++) {
      sum += data[i - j].close
    }
    result.push(sum / dayCount)
  }
  return result
} 