<template>
  <Layout>
    <Tabs class-prefix="statistics-types" :data-source="typeArray" :value.sync="typeValue"/>
    <Tabs class-prefix="statistics-DWM" :data-source="DWMArray" :value.sync="DWMValue"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Types from '@/components/Types.vue';
import Tabs from '@/components/Tabs.vue';

@Component({components: {Tabs, Types}})
export default class Statistics extends Vue {
  typeValue = '-'; // 给出初始值，并且能回收到更改后的值
  typeArray = [
    {text: '支出', value: '-'},
    {text: '收入', value: '+'},
  ];
  DWMValue='D';
  DWMArray = [
    {text: '按天', value: 'D'},
    {text: '按周', value: 'W'},
    {text: '按月', value: 'M'}
  ];
}
</script>

<style lang="scss">
.statistics-types,.statistics-DWM {
  &-tabs{
    .selected{
      background: white;
    }
  }
}
.statistics-types-tabs .selected::after{
  display: none!important;
}
</style>
<style lang="scss" scoped>
// 这是一种父传子style的方式
//::v-deep .types{
//  > .selected{
//    background:white;
//  }
//}
</style>