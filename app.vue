<template>
  <div class="app-container">
    <Navbar />
    <main class="main-content">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue';
</script>

<style>
.app-container {
  min-height: 100vh;
  background-color: #f0f2f5;
}

.main-content {
  min-height: calc(100vh - 64px);
}

/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>
