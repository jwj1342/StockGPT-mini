<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="flex items-center justify-center mb-4">
          <div class="w-8 h-8 bg-primary-500 rounded mr-2"></div>
          <span class="text-xl font-bold">Let'sAPI</span>
        </div>
        <h3 class="text-xl font-semibold text-center">用户登录</h3>
      </template>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <UFormGroup label="用户名/邮箱">
          <UInput
            v-model="loginForm.username"
            placeholder="请输入用户名"
          />
        </UFormGroup>

        <UFormGroup label="密码">
          <UInput
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
          />
        </UFormGroup>

        <UButton
          type="submit"
          color="primary"
          block
          :loading="loading"
        >
          登录
        </UButton>

        <div class="flex justify-between text-sm mt-4">
          <NuxtLink to="/register" class="text-primary-500 hover:text-primary-600">
            没有账号？点击注册
          </NuxtLink>
        </div>
      </form>

      <template #footer>
        <div class="text-center text-sm text-gray-500">
          © 2025 jwj. All rights reserved.
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'

const loading = ref(false)
const loginForm = reactive({
  username: '',
  password: ''
})

const userStore = useUserStore()
const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  try {
    const success = await userStore.login(loginForm.username, loginForm.password)
    if (success) {
      router.push('/')
    } else {
      // 可以添加错误提示
      alert('登录失败')
    }
  } catch (error) {
    console.error('登录失败:', error)
  } finally {
    loading.value = false
  }
}
</script> 