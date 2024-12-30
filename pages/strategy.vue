<template>
  <div class="calc-height flex overflow-hidden bg-gray-100">
    <!-- 左侧聊天面板 -->
    <div 
      class="transition-all duration-300 ease-in-out bg-white border-r relative"
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
        <div class="p-3 border-b bg-white">
          <h3 
            class="font-medium text-center text-lg text-primary-600" 
            :class="{ 'invisible': isCollapsed }"
          >
            <div class="flex items-center justify-center gap-2">
              <UIcon 
                name="i-heroicons-sparkles" 
                class="w-5 h-5 text-primary-500"
              />
              <span>策略助手</span>
            </div>
          </h3>
        </div>

        <!-- 聊天区域 -->
        <div v-show="!isCollapsed" class="flex-1 flex flex-col overflow-hidden relative">
          <!-- 聊天消息区域 -->
          <div class="flex-1 overflow-y-auto p-4 space-y-4 pb-[180px]">
            <div 
              v-for="(message, index) in chatMessages" 
              :key="index" 
              class="flex"
              :class="[message.type === 'user' ? 'justify-end' : 'justify-start']"
            >
              <div 
                class="max-w-[80%] rounded-lg p-3 shadow-sm"
                :class="[
                  message.type === 'user' 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800'
                ]"
              >
                <div class="text-sm leading-relaxed">
                  {{ message.content }}
                </div>
              </div>
            </div>
          </div>

          <!-- 固定在底部的输入框 -->
          <div class="absolute bottom-0 left-0 right-0 bg-white border-t z-20">
            <div class="p-4">
              <div class="flex gap-2">
                <UTextarea
                  v-model="inputMessage"
                  :rows="3"
                  placeholder="输入您的策略需求..."
                  class="flex-1 text-sm rounded-lg border-gray-200 focus:border-primary-500 focus:ring-primary-500"
                  @keyup.enter.prevent="sendMessage"
                />
                <UButton
                  color="primary"
                  icon="i-heroicons-paper-airplane"
                  class="self-end"
                  :class="{'opacity-50': !inputMessage.trim()}"
                  :disabled="!inputMessage.trim()"
                  @click="sendMessage"
                />
              </div>
            </div>
          </div>

          <!-- 策略抽屉 - 调整z-index使其在输入框之下 -->
          <div 
            class="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg transform transition-transform duration-300 z-10"
            :class="[
              isStrategyDrawerOpen 
                ? 'translate-y-0' 
                : `translate-y-[calc(100%-2.5rem)]`
            ]"
            :style="{
              maxHeight: '80vh',
              bottom: isStrategyDrawerOpen ? '140px' : '140px',
            }"
          >
            <!-- 抽屉把手 -->
            <div 
              class="h-12 flex items-center justify-center cursor-pointer hover:bg-gray-50 rounded-t-xl border-b"
              @click="toggleStrategyDrawer"
            >
              <div class="flex items-center gap-2">
                <div class="w-10 h-1 bg-primary-200 rounded-full"></div>
                <span class="text-sm text-primary-600 font-medium">
                  {{ isStrategyDrawerOpen ? '收起策略面板' : '展开策略面板' }}
                </span>
              </div>
            </div>

            <!-- 策略内容区域 -->
            <div class="p-4 overflow-y-auto bg-gradient-to-b from-white to-gray-50">
              <!-- 交易策略输入 -->
              <div class="mb-6">
                <h4 class="text-sm font-medium text-primary-600 mb-3 flex items-center gap-2">
                  <UIcon name="i-heroicons-code-bracket-square" class="w-5 h-5"/>
                  交易策略
                </h4>
                <div class="space-y-3">
                  <UTextarea
                    v-model="strategyContent"
                    :rows="3"
                    placeholder="输入您的交易策略..."
                    class="text-sm w-full rounded-lg"
                  />
                  <div class="flex justify-between gap-2">
                    <UButton 
                      size="sm"
                      color="primary" 
                      variant="soft"
                      class="flex-1"
                      @click="useAssistantStrategy"
                    >
                      <template #leading>
                        <UIcon name="i-heroicons-sparkles" class="w-4 h-4"/>
                      </template>
                      使用助手策略
                    </UButton>
                    <UButton
                      size="sm"
                      color="primary"
                      class="flex-1"
                      @click="applyStrategy"
                    >
                      <template #leading>
                        <UIcon name="i-heroicons-play" class="w-4 h-4"/>
                      </template>
                      应用策略
                    </UButton>
                  </div>
                </div>
              </div>
              
              <!-- 预制策略列表 -->
              <div>
                <h4 class="text-sm font-medium text-primary-600 mb-3 flex items-center gap-2">
                  <UIcon name="i-heroicons-squares-2x2" class="w-5 h-5"/>
                  预制策略
                </h4>
                <div class="space-y-2">
                  <div 
                    v-for="(strategy, index) in presetStrategies" 
                    :key="index"
                    class="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100 hover:border-primary-200 hover:bg-primary-50 cursor-pointer transition-colors duration-200"
                    @click="selectPresetStrategy(strategy)"
                  >
                    <span class="text-sm text-gray-700">{{ strategy.name }}</span>
                    <UIcon 
                      name="i-heroicons-chevron-right" 
                      class="w-4 h-4 text-primary-400"
                    />
                  </div>
                </div>
              </div>
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
      <div class="p-4 overflow-hidden transition-all duration-300">
        <div 
          ref="chartContainer"
          class="h-[400px] w-full transition-all duration-300"
        >
          <StrategyChart 
            ref="strategyChart"
            :custom-strategy-data="customStrategyData"
            :user-trade-data="userTradeData"
            :platform-strategy-data="platformStrategyData"
          />
        </div>
      </div>
      
      <!-- 底部面板 -->
      <div class="flex-1 flex gap-4 p-4 bg-white border-t min-h-[500px]">
        <div class="w-1/2 overflow-hidden">
          <UserTradePanel @update-data="updateUserTradeData" />
        </div>
        <div class="w-1/2 overflow-hidden">
          <PlatformStrategyPanel @update-data="updatePlatformStrategyData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import StrategyChart from '~/components/strategy/StrategyChart.vue'
import UserTradePanel from '~/components/strategy/UserTradePanel.vue'
import PlatformStrategyPanel from '~/components/strategy/PlatformStrategyPanel.vue'
import CustomStrategyPanel from '~/components/strategy/CustomStrategyPanel.vue'

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

// 在父组件中管理数据
const customStrategyData = ref([2300, -1800, 3200, -2900, 3500, -2800, 3600, 4000])
const userTradeData = ref([-1800, 2200, -2500, 2300, -2800, 3000, -2900, 3200])
const platformStrategyData = ref([2500, -3000, 3500, -3200, 3800, -3200, 4000, -4500])

const chartContainer = ref(null)
const strategyChart = ref(null)

// 监听折叠状态变化
watch(isCollapsed, () => {
  // 给一个短暂的延时，确保DOM已经更新
  setTimeout(() => {
    strategyChart.value?.resize()
  }, 300)
})

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

// 更新数据的方法
const updateCustomStrategyData = (data: number[]) => {
  customStrategyData.value = data
}

const updateUserTradeData = (data: number[]) => {
  userTradeData.value = data
}

const updatePlatformStrategyData = (data: number[]) => {
  platformStrategyData.value = data
}

// 新增预制策略数据
const presetStrategies = ref([
  { name: '均线突破策略', content: '当短期均线上穿长期均线时买入，下穿时卖出' },
  { name: '量价关系策略', content: '成交量放大且价格上涨时买入，成交量萎缩时卖出' },
  { name: '趋势跟踪策略', content: '维持上升趋势时持续买入，破位时止损' },
  { name: '反转策略', content: '超卖区域买入，超买区域卖出' }
])

const strategyContent = ref('')

// 使用助手策略
const useAssistantStrategy = () => {
  // 这里可以根据当前对话内容生成策略建议
  strategyContent.value = '根据当前市场分析，建议采用趋势跟踪策略，设置8%止盈，3%止损'
}

// 选择预制策略
const selectPresetStrategy = (strategy: { name: string, content: string }) => {
  strategyContent.value = strategy.content
}

// 应用策略
const applyStrategy = () => {
  if (!strategyContent.value) return
  
  // 添加策略应用消息
  chatMessages.value.push({
    type: 'user',
    content: `应用策略: ${strategyContent.value}`
  })
  
  // 模拟策略效果
  setTimeout(() => {
    chatMessages.value.push({
      type: 'assistant',
      content: '策略已应用，系统正在执行交易指令...'
    })
  }, 1000)
}

// 添加抽屉控制状态
const isStrategyDrawerOpen = ref(false)

// 切换抽屉状态
const toggleStrategyDrawer = () => {
  isStrategyDrawerOpen.value = !isStrategyDrawerOpen.value
}
</script>

<style scoped>
/* 计算实际可用高度 - 移除底部导航栏的高度计算 */
.calc-height {
  height: calc(100vh - 64px); /* 只减去顶部导航栏高度 */
  min-height: calc(100vh - 64px);
  max-height: calc(100vh - 64px);
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

/* 添加抽屉相关样式 */
.strategy-drawer-enter-active,
.strategy-drawer-leave-active {
  transition: transform 0.3s ease-in-out;
}

.strategy-drawer-enter-from,
.strategy-drawer-leave-to {
  transform: translateY(100%);
}

/* 添加新的样式 */
.strategy-drawer-shadow {
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* 确保滚动区域的内容不会被输入框遮挡 */
.overflow-y-auto {
  scroll-padding-bottom: 180px;
}
</style> 