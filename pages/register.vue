<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="flex items-center justify-center mb-4">
          <div class="w-8 h-8 bg-primary-500 rounded mr-2"></div>
          <span class="text-xl font-bold">Let'sAPI</span>
        </div>
        <h3 class="text-xl font-semibold text-center">新用户注册</h3>
      </template>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <UFormGroup label="用户名">
          <UInput
            v-model="registerForm.username"
            placeholder="请输入用户名"
          />
        </UFormGroup>

        <UFormGroup label="密码">
          <UInput
            v-model="registerForm.password"
            type="password"
            placeholder="请输入密码"
          />
        </UFormGroup>

        <UFormGroup label="确认密码">
          <UInput
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
          />
        </UFormGroup>

        <UButton
          type="submit"
          color="primary"
          block
          :loading="loading"
        >
          注册
        </UButton>

        <div class="flex justify-between text-sm mt-4">
          <NuxtLink to="/login" class="text-primary-500 hover:text-primary-600">
            已有账号？点击登录
          </NuxtLink>
        </div>
      </form>

      <template #footer>
        <div class="text-center text-sm text-gray-500">
          © 2023 Let'sAPI. All rights reserved.
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'

const loading = ref(false)
const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

const userStore = useUserStore()
const router = useRouter()

const handleRegister = async () => {
  loading.value = true
  try {
    if (registerForm.password !== registerForm.confirmPassword) {
      throw new Error('两次输入的密码不一致')
    }
    
    const success = await userStore.register(
      registerForm.username, 
      registerForm.password
    )
    
    if (success) {
      router.push('/login')
    } else {
      // 可以添加错误提示
      alert('注册失败')
    }
  } catch (error) {
    console.error('注册失败:', error)
  } finally {
    loading.value = false
  }
}
</script> 