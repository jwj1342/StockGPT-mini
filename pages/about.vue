<template>
  <UContainer>
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">关于我们</h3>
      </template>
      
      <p class="text-gray-600 mb-6">
        这是一个基于先进算法的预测分析系统，能够帮助用户进行数据分析和决策支持。
      </p>

      <h4 class="font-medium text-lg mb-4">主要功能</h4>
      <UList class="space-y-2">
        <UListItem>
          <UIcon name="i-heroicons-chart-bar" class="text-primary mr-2" />
          数据预测分析
        </UListItem>
        <UListItem>
          <UIcon name="i-heroicons-cog" class="text-primary mr-2" />
          策略制定与优化
        </UListItem>
        <UListItem>
          <UIcon name="i-heroicons-clock" class="text-primary mr-2" />
          实时数据监控
        </UListItem>
        <UListItem>
          <UIcon name="i-heroicons-presentation-chart-line" class="text-primary mr-2" />
          可视化报表
        </UListItem>
      </UList>
    </UCard>
  </UContainer>
</template>

<style scoped>
.about-container {
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

h1 {
  margin-bottom: 24px;
  color: #333;
}

.about-content {
  max-width: 800px;
  line-height: 1.6;
}

.features {
  margin-top: 24px;
}

h2 {
  margin: 16px 0;
  color: #333;
}

ul {
  list-style-type: disc;
  margin-left: 20px;
}

li {
  margin: 8px 0;
  color: #666;
}
</style>
