<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 gap-8 items-center">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-4">
              StockGPT-mini
            </h1>
            <p class="text-xl text-gray-600 mb-8">
              全新的高颜值/高性能的AI交易辅助系统
            </p>
            <p class="text-gray-500 mb-8">
              <span>{{ currentText }}</span>
              <span class="animate-pulse">|</span>
            </p>
            <div class="flex space-x-4">
              <UButton color="primary" size="lg">开始使用</UButton>
              <UButton color="gray" variant="soft" size="lg">了解更多</UButton>
            </div>
          </div>
          <div class="flex justify-end">
            <img 
              src="/asset/img/hero.jpg" 
              alt="Hero Image" 
              class="rounded-lg object-cover"
              style="width: 500px; height: 500px;"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 模型集成部分 -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-center text-2xl font-semibold mb-12">众多AI大模型完美适配</h2>
        <div class="grid grid-cols-4 gap-8">
          <!-- ChatGLM -->
          <div class="flex flex-col items-center p-6 bg-white rounded-2xl shadow">
            <img src="/asset/img/chatglm.png" alt="ChatGLM" class="w-16 h-16 object-contain mb-4" />
            <h3 class="font-semibold text-lg text-gray-900">ChatGLM</h3>
            <p class="text-sm text-gray-500 mt-2">智能对话模型</p>
          </div>

          <!-- ChatGPT -->
          <div class="flex flex-col items-center p-6 bg-white rounded-2xl shadow">
            <img src="/asset/img/gpt.jpg" alt="ChatGPT" class="w-16 h-16 object-contain mb-4" />
            <h3 class="font-semibold text-lg text-gray-900">ChatGPT</h3>
            <p class="text-sm text-gray-500 mt-2">OpenAI旗舰模型</p>
          </div>

          <!-- Kimi -->
          <div class="flex flex-col items-center p-6 bg-white rounded-2xl shadow">
            <img src="/asset/img/kimi.jpg" alt="Kimi" class="w-16 h-16 object-contain mb-4" />
            <h3 class="font-semibold text-lg text-gray-900">Kimi</h3>
            <p class="text-sm text-gray-500 mt-2">Moonshot AI</p>
          </div>

          <!-- 豆包AI -->
          <div class="flex flex-col items-center p-6 bg-white rounded-2xl shadow">
            <img src="/asset/img/douban.jpg" alt="豆包" class="w-16 h-16 object-contain mb-4" />
            <h3 class="font-semibold text-lg text-gray-900">豆包AI</h3>
            <p class="text-sm text-gray-500 mt-2">字节跳动</p>
          </div>

          <!-- 文心一言 -->
          <div class="flex flex-col items-center p-6 bg-white rounded-2xl shadow">
            <img src="/asset/img/wenxin.jpg" alt="文心一言" class="w-16 h-16 object-contain mb-4" />
            <h3 class="font-semibold text-lg text-gray-900">文心一言</h3>
            <p class="text-sm text-gray-500 mt-2">百度AI</p>
          </div>

          <!-- 微软小冰 -->
          <div class="flex flex-col items-center p-6 bg-white rounded-2xl shadow">
            <img src="/asset/img/xiaobing.png" alt="小冰" class="w-16 h-16 object-contain mb-4" />
            <h3 class="font-semibold text-lg text-gray-900">微软小冰</h3>
            <p class="text-sm text-gray-500 mt-2">对话机器人</p>
          </div>

          <!-- 小艺 -->
          <div class="flex flex-col items-center p-6 bg-white rounded-2xl shadow">
            <img src="/asset/img/xiaoyi.jpg" alt="小艺" class="w-16 h-16 object-contain mb-4" />
            <h3 class="font-semibold text-lg text-gray-900">小艺</h3>
            <p class="text-sm text-gray-500 mt-2">网易AI</p>
          </div>

          <!-- 智谱轻言 -->
          <div class="flex flex-col items-center p-6 bg-white rounded-2xl shadow">
            <img src="/asset/img/zhipu.jpg" alt="智谱" class="w-16 h-16 object-contain mb-4" />
            <h3 class="font-semibold text-lg text-gray-900">智谱轻言</h3>
            <p class="text-sm text-gray-500 mt-2">智谱AI</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 功能展示部分 -->
    <section class="bg-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-center text-2xl font-semibold mb-12">模型概览</h2>
        <div class="bg-gray-50 rounded-lg p-8">
          <div class="grid grid-cols-2 gap-8">
            <!-- 左栏模型 -->
            <div class="space-y-4">
              <ValuationModelCard
                v-for="model in valuationModels.slice(0, 4)"
                :key="model.name"
                :model="model"
                @view="showModelInfo"
                @edit="editModelParams"
              />
            </div>
            <!-- 右栏模型 -->
            <div class="space-y-4">
              <ValuationModelCard
                v-for="model in valuationModels.slice(4)"
                :key="model.name"
                :model="model"
                @view="showModelInfo"
                @edit="editModelParams"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 模型信息弹窗 -->
      <UModal v-model="showModal">
        <div class="p-6">
          <h3 class="text-xl font-semibold mb-4">{{ selectedModel?.name }}</h3>
          <p class="text-gray-600 mb-4">{{ selectedModel?.description }}</p>
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-medium mb-2">计算公式：</h4>
            <p class="font-mono text-sm">{{ selectedModel?.formula }}</p>
          </div>
        </div>
      </UModal>
    </section>

    <!-- 接入步骤 -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-center text-2xl font-semibold mb-12">接入步骤</h2>
        <div class="grid grid-cols-2 gap-8">
          <div class="flex justify-center">
            <!-- 二维码区域 -->
            <div class="bg-white p-8 rounded-lg shadow-lg text-center">
              <img 
                :src="`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrCodeData)}`"
                alt="登录二维码" 
                class="w-64 h-64 mb-4"
              />
              <p class="text-gray-600 text-sm">扫码授权快速登录</p>
              <p class="text-gray-400 text-xs mt-2">请使用手机扫描二维码</p>
            </div>
          </div>
          <div class="space-y-8">
            <div v-for="(step, index) in steps" :key="index" class="flex items-start space-x-4">
              <div class="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-500 font-semibold">
                {{ index + 1 }}
              </div>
              <div>
                <h3 class="font-semibold mb-2">{{ step.title }}</h3>
                <p class="text-gray-600">{{ step.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { 
  ChartBarIcon, 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  BuildingLibraryIcon,
  ScaleIcon,
  BanknotesIcon,
  ChartPieIcon,
  CalculatorIcon
} from '@heroicons/vue/24/outline'

const currentText = ref('')
const texts = [
  '在这个AI高速发展的时代',
  '让AI助你把握每一次交易机会',
  '用科技的力量预见市场的未来',
  '让数据驱动你的投资决策'
]

let currentIndex = 0
let charIndex = 0
let isDeleting = false
let typingSpeed = 100

const typeText = () => {
  const currentFullText = texts[currentIndex]
  
  if (!isDeleting) {
    // 打字过程
    currentText.value = currentFullText.substring(0, charIndex + 1)
    charIndex++
    
    if (charIndex === currentFullText.length) {
      // 完成打字后，等待更长时间再开始删除
      isDeleting = true
      typingSpeed = 3000 // 增加到3秒的停顿时间
    }
  } else {
    // 删除过程
    currentText.value = currentFullText.substring(0, charIndex - 1)
    charIndex--
    
    if (charIndex === 0) {
      isDeleting = false
      currentIndex = (currentIndex + 1) % texts.length
      typingSpeed = 100
    }
  }
  
  // 调整删除速度，从50ms改为200ms
  setTimeout(typeText, isDeleting ? 200 : typingSpeed)
}

onMounted(() => {
  typeText()
})

const steps = [
  {
    title: '注册账号',
    description: '只需要简单几步即可完成账号注册'
  },
  {
    title: '选择模型',
    description: '从多个AI模型中选择适合您需求的模型'
  },
  {
    title: '获取密钥',
    description: '生成API密钥，开始使用我们的服务'
  },
  {
    title: '开始使用',
    description: '按照文档说明快速接入您的应用'
  }
];

// 生成随机的二维码数据
const qrCodeData = ref(`stockgpt-login-${Math.random().toString(36).substring(7)}`)

// 估值模型数据
const valuationModels = [
  {
    name: 'DCF模型',
    shortDesc: '现金流贴现模型',
    icon: CurrencyDollarIcon,
    description: 'DCF（贴现现金流）模型通过预测公司未来现金流并将其折现到现值来评估公司价值。这种方法考虑了货币的时间价值，被认为是最全面的估值方法之一。',
    formula: '内在价值 = Σ（FCF / (1 + WACC)^t）'
  },
  {
    name: '市盈率模型',
    shortDesc: 'P/E估值模型',
    icon: ChartBarIcon,
    description: '市盈率（P/E）模型是最常用的估值方法之一，通过比较公司股价与每股收益的比率来评估股票价值。这个指标可以用来比较同行业公司的相对估值水平。',
    formula: '市盈率 = 市值 / 净利润'
  },
  {
    name: 'PEG模型',
    shortDesc: '市盈率增长比模型',
    icon: ArrowTrendingUpIcon,
    description: 'PEG（市盈率增长比）模型将公司的市盈率与其预期的收益增长率相结合，提供了一个考虑增长因素的估值指标。PEG比率小于1通常被认为是被低估的信号。',
    formula: 'PEG = 市盈率 / 年度盈利增长率'
  },
  {
    name: 'EV/EBITDA模型',
    shortDesc: '企业价值倍数模型',
    icon: BuildingLibraryIcon,
    description: 'EV/EBITDA模型比较企业价值与息税折旧摊销前利润的比率，这个指标可以更好地比较不同资本结构和税收环境下的公司。',
    formula: 'EV/EBITDA = (企业价值 - 现金及现金等价物) / EBITDA'
  },
  {
    name: '市净率模型',
    shortDesc: 'P/B估值模型',
    icon: ScaleIcon,
    description: '市净率（P/B）模型通过比较公司市值与账面价值的比率来评估股票。这个指标对于评估资产密集型企业特别有用，也常用于金融机构的估值。',
    formula: '市净率 = 市值 / 股东权益'
  },
  {
    name: '自由现金流模型',
    shortDesc: 'FCF估值模型',
    icon: BanknotesIcon,
    description: '自由现金流模型通过分析公司产生的自由现金流来评估公司价值，考虑了公司的运营效率和现金生成能力。',
    formula: '内在价值 = Σ（FCF / (1 + WACC)^t）'
  },
  {
    name: '资本资产定价模型',
    shortDesc: 'CAPM模型',
    icon: ChartPieIcon,
    description: 'CAPM模型用于估算投资的预期收益，考虑了市场风险和个别资产的风险系数。',
    formula: '预期回报率 = 无风险利率 + β * （市场平均回报率 - 无风险利率）'
  },
  {
    name: '净资产收益率模型',
    shortDesc: 'ROE模型',
    icon: CalculatorIcon,
    description: 'ROE模型衡量公司利用股东投入资本创造利润的能力，是评估公司盈利能力的重要指标。',
    formula: 'ROE = 净利润 / 股东权益'
  }
];

const showModal = ref(false)
const selectedModel = ref(null)

const showModelInfo = (model) => {
  selectedModel.value = model
  showModal.value = true
}

const editModelParams = (model) => {
  // TODO: 实现编辑模型参数的逻辑
  console.log('编辑模型参数:', model.name)
}
</script>
