<template>
  <UContainer>
    <UCard class="mb-4">
      <template #header>
        <h3 class="text-lg font-semibold">预测分析</h3>
      </template>
      <Chart class="h-96" />
    </UCard>

    <div class="grid md:grid-cols-2 gap-4">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">信息面板</h3>
        </template>
        <InfoPanel />
      </UCard>

      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">算法设置</h3>
        </template>
        <AlgorithmSettings />
      </UCard>
    </div>
  </UContainer>
</template>

<script setup>
import Chart from '~/components/Chart.vue';
import InfoPanel from '~/components/InfoPanel.vue';
import AlgorithmSettings from '~/components/AlgorithmSettings.vue';
</script> 