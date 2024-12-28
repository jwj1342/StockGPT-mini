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
            'bg-blue-400 text-white'
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

// 输入框
const input = ref('');
// 聊天的 Pinia Store
const chatStore = useChatStore();
// 选择的模型
const selectedModel = ref(null);

// 模型选项
const modelOptions = [
  { label: 'GPT-4o-mini', value: 'gpt-4o-mini' },
  { label: 'GPT-4o', value: 'gpt-4o' },
];

// 示例历史对话
const savedChats = ref([
  { title: '对话 1', id: 1 },
  { title: '对话 2', id: 2 },
  { title: '对话 3', id: 3 },
]);

// 发送消息
const sendMessage = async () => {
  // 如果输入内容为空，则不发送
  if (!input.value.trim()) return;

  // 先将用户的消息追加到对话中
  chatStore.addMessage({
    role: 'user',
    content: input.value
  });

  // 由于需要调用后端接口，最好使用 try/catch 保证出错时的处理
  try {
    // 这里的 `/chat` 就是你后端的路由地址，根据实际情况修改
    const res = await fetch('https://cn-jn-lt-plustmp1.natfrp.cloud:25735/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body 中的字段要和后端 FastAPI 中的 `ChatRequest` 模型对应
      body: JSON.stringify({
        model: selectedModel.value || 'gpt-4o',
        message: input.value,
        temperature: 1   // 可根据需求自定义
      })
    });

    // 如果后端返回非 2xx 状态，抛出错误
    if (!res.ok) {
      throw new Error(`请求失败，状态码：${res.status}`);
    }

    // 解析后端返回的 JSON 数据
    const data = await res.json();

    // 后端返回的内容中，假设是 data.response 就是回答文本
    // 现在把 AI 回答添加到聊天记录中
    chatStore.addMessage({
      role: 'assistant',
      content: data.response
    });
  } catch (error) {
    console.error('调用后端接口出错：', error);
    // 如果需要，可以在界面上给用户一个错误提示
    chatStore.addMessage({
      role: 'assistant',
      content: `AI 接口调用出错：${error.message}`
    });
  } finally {
    // 无论成功还是失败都清空输入框
    input.value = '';
  }
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