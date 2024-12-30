<template>
  <div class="min-h-screen flex flex-col">
    <Navbar class="flex-none" />
    <main class="flex-1 overflow-hidden">
      <NuxtPage />
    </main>
    <Footer class="flex-none" />
  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';
</script>

<style>
/* 移除之前的样式，使用新的 flex 布局 */
</style>