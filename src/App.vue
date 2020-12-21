<template>
  <div id="app" v-title data-title="点滴记账本">
  <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "App",
  directives: {
    title: {
      inserted(el, info) {
       document.title=el.dataset.title
      }
    },
  },
};
</script>
<style lang="scss">
@import '~@/assets/styles/reset.scss';
@import "~@/assets/styles/helper.scss";
#app { // 全局样式
  font-size: 16px; // 把浏览器默认字体覆盖掉
  line-height: 1.5; // 设置整个页面字体的行高
  font-family: $font-song;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}
</style>
