<template>
  <div class="app-container">
    <Navbar />
    <main class="main-content">
      <NuxtPage />
    </main>
    <Footer class="fixed-footer" />
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
}

.fixed-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff; /* 根据需要调整背景颜色 */
  z-index: 1000; /* 确保 footer 在最上层 */
}
</style>