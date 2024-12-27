<template>
  <div class="flex h-screen">
    <!-- 左侧对话区域 -->
    <div class="flex-1 flex flex-col h-full border-r">
      <!-- 对话历史区域 -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        <div v-for="(message, index) in chatStore.chatHistory" :key="index" 
          class="max-w-3xl mx-auto flex"
          :class="{'justify-end': message.role === 'user'}">
          <div :class="[ 
            'p-3 rounded-lg max-w-xs',
            message.role === 'user' ? 'bg-green-400 text-white' : 'bg-gray-200 text-black'
          ]">
            {{ message.content }}
          </div>
        </div>
      </div>
      
      <!-- 输入区域 -->
      <div class="border-t p-4">
        <div class="max-w-3xl mx-auto space-y-4">
          <UTextarea
            v-model="input"
            rows="4"
            placeholder="在这里输入您的问题..."
            class="w-full"
          />
          <UButton color="primary" block @click="sendMessage">
            发送
          </UButton>
        </div>
      </div>
    </div>

    <!-- 右侧管理区域 -->
    <div class="w-80 border-l bg-gray-50 p-4">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">对话管理</h3>
        
        <!-- 对话设置 -->
        <div class="space-y-2">
          <h4 class="font-medium">模型设置</h4>
          <USelect
            v-model="selectedModel"
            :options="modelOptions"
            placeholder="选择模型"
          />
        </div>

        <!-- 对话记录 -->
        <div class="space-y-2">
          <h4 class="font-medium">历史对话</h4>
          <div class="space-y-2">
            <UButton
              v-for="(chat, index) in savedChats"
              :key="index"
              variant="ghost"
              block
              class="justify-start"
            >
              {{ chat.title }}
            </UButton>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="space-y-2">
          <UButton variant="outline" block>
            新建对话
          </UButton>
          <UButton variant="outline" block>
            清空当前对话
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useChatStore } from '../stores/chatStore';

const input = ref('');
const chatStore = useChatStore();
const selectedModel = ref(null);

// 模型选项
const modelOptions = [
  { label: 'GPT-3.5', value: 'gpt-3.5' },
  { label: 'GPT-4', value: 'gpt-4' },
];

// 示例历史对话
const savedChats = ref([
  { title: '对话 1', id: 1 },
  { title: '对话 2', id: 2 },
  { title: '对话 3', id: 3 },
]);

// 发送消息
const sendMessage = () => {
  if (!input.value.trim()) return;
  
  // 添加用户消息
  chatStore.addMessage({
    role: 'user',
    content: input.value
  });
  
  // 模拟AI响应
  setTimeout(() => {
    chatStore.addMessage({
      role: 'assistant',
      content: '这是一个模拟的AI响应...'
    });
  }, 1000);
  
  input.value = '';
};
</script>

<style scoped>
/* 自定义滚动条样式 */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #CBD5E0 #EDF2F7;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #EDF2F7;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #CBD5E0;
  border-radius: 3px;
}
</style> 