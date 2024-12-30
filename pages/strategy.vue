<template>
  <div class="calc-height flex overflow-hidden bg-gray-100">
    <!-- 左侧聊天面板 -->
    <div 
      class="transition-all duration-300 bg-white border-r relative"
      :class="[isCollapsed ? 'w-16' : 'w-1/3']"
    >
      <div class="h-full flex flex-col">
        <!-- 收缩按钮位置调整 -->
        <div 
          class="absolute -right-3 top-2 z-10 bg-white rounded-full shadow-md cursor-pointer"
          @click="toggleCollapse"
        >
          <UButton
            color="gray"
            variant="ghost"
            size="sm"
            :icon="isCollapsed ? 'i-heroicons-chevron-right' : 'i-heroicons-chevron-left'"
            class="rounded-full"
          />
        </div>

        <!-- 标题栏调整上边距 -->
        <div class="p-2 border-b bg-white">
          <h3 class="font-medium" :class="{ 'invisible': isCollapsed }">策略助手</h3>
        </div>

        <!-- 聊天区域 -->
        <div v-show="!isCollapsed" class="flex-1 flex flex-col overflow-hidden">
          <div class="flex-1 overflow-y-auto p-4 space-y-4">
            <div v-for="(message, index) in chatMessages" :key="index" 
              class="flex"
              :class="[message.type === 'user' ? 'justify-end' : 'justify-start']"
            >
              <div 
                class="max-w-[80%] rounded-lg p-3"
                :class="[
                  message.type === 'user' 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-100 text-gray-900'
                ]"
              >
                {{ message.content }}
              </div>
            </div>
          </div>

          <!-- 输入框 -->
          <div class="p-4 border-t bg-white">
            <div class="flex gap-2">
              <UTextarea
                v-model="inputMessage"
                :rows="3"
                placeholder="输入您的策略需求..."
                class="flex-1"
                @keyup.enter.prevent="sendMessage"
              />
              <UButton
                color="primary"
                icon="i-heroicons-paper-airplane"
                @click="sendMessage"
              />
            </div>
          </div>
        </div>

        <!-- 收缩时的图标列表 -->
        <div v-show="isCollapsed" class="flex-1 py-4 overflow-y-auto">
          <UButton
            v-for="(icon, index) in collapsedIcons"
            :key="index"
            block
            color="gray"
            variant="ghost"
            class="mb-2"
            :icon="icon"
          />
        </div>
      </div>
    </div>

    <!-- 右侧主要内容 -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- 图表区域 -->
      <div class="flex-grow p-4 overflow-hidden">
        <StrategyChart />
      </div>
      
      <!-- 底部面板高度调整 -->
      <div class="h-64 flex gap-4 p-4 bg-white border-t">
        <div class="w-1/2 overflow-hidden">
          <UserTradePanel />
        </div>
        <div class="w-1/2 overflow-hidden">
          <PlatformStrategyPanel />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StrategyChart from '~/components/strategy/StrategyChart.vue'
import UserTradePanel from '~/components/strategy/UserTradePanel.vue'
import PlatformStrategyPanel from '~/components/strategy/PlatformStrategyPanel.vue'

const isCollapsed = ref(false)
const inputMessage = ref('')
const textareaRows = 3

// 收缩时显示的图标列表
const collapsedIcons = [
  'i-heroicons-chat-bubble-left-right',
  'i-heroicons-cog-6-tooth',
  'i-heroicons-document-text',
  'i-heroicons-information-circle'
]

// 模拟的聊天消息
const chatMessages = ref([
  { type: 'assistant', content: '您好！我是您的策略助手，请问有什么可以帮您？' },
  { type: 'user', content: '我想了解一下最近的市场趋势' },
  { type: 'assistant', content: '根据最近的市场数据分析，主要指数呈现震荡上行趋势...' }
])

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const sendMessage = () => {
  if (!inputMessage.value.trim()) return
  
  // 添加用户消息
  chatMessages.value.push({
    type: 'user',
    content: inputMessage.value
  })

  // 模拟助手回复
  setTimeout(() => {
    chatMessages.value.push({
      type: 'assistant',
      content: '收到您的消息，我们正在分析相关策略...'
    })
  }, 1000)

  // 清空输入
  inputMessage.value = ''
}
</script>

<style scoped>
/* 计算实际可用高度 */
.calc-height {
  height: calc(100vh - 64px - 40px); /* 减去顶部导航栏(64px)和底部导航栏(40px)的高度 */
  min-height: calc(100vh - 64px - 40px);
  max-height: calc(100vh - 64px - 40px);
}

/* 自定义滚动条样式 */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #CBD5E0 #EDF2F7;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #CBD5E0;
  border-radius: 2px;
}
</style> 