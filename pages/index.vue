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
            <!-- 占位图 -->
            <div class="w-96 h-96 bg-gray-100 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 模型集成部分 -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-center text-2xl font-semibold mb-12">众多AI大模型完美适配</h2>
        <div class="grid grid-cols-4 gap-8">
          <div v-for="i in 8" :key="i" class="flex items-center justify-center p-4 bg-white rounded-lg shadow">
            <div class="w-16 h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 功能展示部分 -->
    <section class="bg-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-center text-2xl font-semibold mb-12">模型概览</h2>
        <div class="bg-gray-50 rounded-lg p-8">
          <!-- 模拟模型列表界面 -->
          <div class="space-y-4">
            <div v-for="i in 5" :key="i" class="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div class="flex items-center space-x-4">
                <div class="w-8 h-8 bg-primary-100 rounded"></div>
                <span>API Endpoint {{ i }}</span>
              </div>
              <div class="flex space-x-2">
                <UButton size="sm">查看</UButton>
                <UButton size="sm" color="gray" variant="soft">编辑</UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 接入步骤 -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-center text-2xl font-semibold mb-12">接入步骤</h2>
        <div class="grid grid-cols-2 gap-8">
          <div class="flex justify-center">
            <!-- 占位图 -->
            <div class="w-80 h-96 bg-gray-100 rounded-lg"></div>
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
</script>
