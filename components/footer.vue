<template>
  <div class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <p>&copy; 2024 股票预测公司. All Rights Reserved.</p>
          <p>版权所有，翻版必究。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: white; /* 修改为白色 */
  color: black; /* 修改为黑色 */
  text-align: center;
  padding: 10px 0;
  box-sizing: border-box;
}

/* 添加一些额外的样式来适应新的内容 */
.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.col-md-6,
.col-md-12 {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
}

.list-unstyled {
  padding-left: 0;
  list-style: none;
}

.list-unstyled li {
  display: inline;
  margin-right: 10px;
}

.list-unstyled li a {
  color: black; /* 修改为黑色 */
  text-decoration: none;
}

.list-unstyled li a:hover {
  text-decoration: underline;
}
</style>