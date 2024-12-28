<template>
  <div class="app-container">
    <Navbar />
    <main class="main-content">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';
</script>

<style>
/* ... 其他样式 ... */

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding-bottom: 20px; /* 添加底部内边距，防止内容被 footer 遮挡 */
}
</style>