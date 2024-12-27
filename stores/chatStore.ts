import { defineStore } from 'pinia';

export const useChatStore = defineStore('chat', {
  state: () => ({
    chatHistory: [] as Array<{ role: string; content: string }>,
  }),
  actions: {
    addMessage(message: { role: string; content: string }) {
      this.chatHistory.push(message);
    },
    clearChat() {
      this.chatHistory = [];
    },
  },
});
