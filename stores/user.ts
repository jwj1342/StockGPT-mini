import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    userInfo: {
      username: '',
      // 可以添加更多用户信息字段
    }
  }),

  actions: {
    setLoginState(state: boolean) {
      this.isLoggedIn = state
    },

    setUserInfo(userInfo: any) {
      this.userInfo = userInfo
    },

    // 登录动作
    async login(username: string, password: string) {
      try {
        // 这里添加实际的登录API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        this.setLoginState(true)
        this.setUserInfo({ username })
        
        // 可以在这里保存token到localStorage
        localStorage.setItem('token', 'dummy-token')
        
        return true
      } catch (error) {
        console.error('登录失败:', error)
        return false
      }
    },

    // 注册动作
    async register(username: string, password: string) {
      try {
        // 这里添加实际的注册API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        return true
      } catch (error) {
        console.error('注册失败:', error)
        return false
      }
    },

    // 登出动作
    logout() {
      this.setLoginState(false)
      this.setUserInfo({ username: '' })
      localStorage.removeItem('token')
    }
  },

  getters: {
    // 获取用户名
    username: (state) => state.userInfo.username,
    // 判断是否已登录
    loggedIn: (state) => state.isLoggedIn
  },

}) 