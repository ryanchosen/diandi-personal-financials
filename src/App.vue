<template>
  <div id="app">
  <router-view></router-view>
  </div>
</template>
<style lang="scss">
@import '~@/assets/styles/reset.scss';
@import "~@/assets/styles/helper.scss";
#app { // 全局样式
  line-height: 1.5; // 设置整个页面字体的行高
  font-family: $font-song;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
}
</style>
