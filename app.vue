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

<!-- 保持现有的样式 -->
<style>
/* ... */
</style>
