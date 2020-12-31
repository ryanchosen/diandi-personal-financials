<template>
  <div class="wrapper" ref="wrapper"></div>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const echarts = require('echarts');

@Component

export default class Chart extends Vue {
  @Prop() options;
  @Prop() loading;
  @Watch('loading')
  onLoadingChanged(newValue: string) {
    if(newValue){
      (this as any).chart.showLoading()
    }else{
      (this as any).chart.hideLoading()
    }
  }
  mounted() {
    console.log(this.loading);
    (this as any).chart = echarts.init(this.$refs.wrapper);
    (this as any).chart.setOption(this.options);
  }
}
</script>
<style lang="scss">
.wrapper {
  height: 350px;
}
</style>