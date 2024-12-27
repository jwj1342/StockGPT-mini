<template>
  <nav class="border-b bg-white">
    <div class="w-full px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center mr-8">
            <img 
              src="/tupian/logo3.jpg" 
              alt="StockGPT Logo" 
              class="w-10 h-10 mr-2 rounded"
            />
            <span class="text-xl font-bold text-primary-500">StockGPT</span>
          </NuxtLink>
          
          <!-- 导航链接 -->
          <div class="flex space-x-8">
            <NuxtLink 
              v-for="(item, index) in navItems" 
              :key="index"
              :to="item.path"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium"
              :class="[
                isActive(item.path) 
                  ? 'text-primary-500 border-b-2 border-primary-500' 
                  : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
              ]"
            >
              <component 
                :is="item.icon" 
                class="w-5 h-5 mr-1"
              />
              {{ item.name }}
            </NuxtLink>
          </div>
        </div>

        <!-- 登录注册按钮 -->
        <div class="flex items-center space-x-4">
          <template v-if="!userStore.isLoggedIn">
            <NuxtLink to="/login">
              <UButton color="gray" variant="soft">登录</UButton>
            </NuxtLink>
            <NuxtLink to="/register">
              <UButton color="primary">注册</UButton>
            </NuxtLink>
          </template>
          <template v-else>
            <div class="flex items-center space-x-4">
              <span class="text-gray-700">欢迎, {{ userStore.username }}</span>
              <UButton color="gray" variant="soft" @click="handleLogout">
                退出
              </UButton>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { 
  HomeIcon,
  BeakerIcon,
  ChartBarIcon,
  LightBulbIcon,
  InformationCircleIcon
} from '@heroicons/vue/24/outline';
import { useUserStore } from '~/stores/user'

const route = useRoute();
const isActive = (path) => route.path === path;

const navItems = [
  { name: '首页', path: '/', icon: HomeIcon },
  { name: 'Playground', path: '/playground', icon: BeakerIcon },
  { name: '预测', path: '/predict', icon: ChartBarIcon },
  { name: '策略辅助', path: '/strategy', icon: LightBulbIcon },
  { name: '关于', path: '/about', icon: InformationCircleIcon }
];

const userStore = useUserStore()
const router = useRouter()

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>
