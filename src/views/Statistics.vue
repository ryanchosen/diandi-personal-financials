<template>
  <Layout>
    <Tabs class-prefix="statistics-types" :data-source="recordTypeList" :value.sync="recordTypeValue"/>
    <Tabs class-prefix="statistics-DWM" :data-source="dayWeekMonthList" :value.sync="dayWeekMonthValue"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import dayWeekMonthList from '@/constants/dayWeekMonthList';
import recordTypeList from '@/constants/recordTypeList'

@Component({components: {Tabs}})
export default class Statistics extends Vue {
  recordTypeValue = '-'; // 给出初始值，并且能回收到更改后的值
  recordTypeList = recordTypeList;
  dayWeekMonthValue='D';
  dayWeekMonthList = dayWeekMonthList;
}
</script>

<style lang="scss" scoped>
::v-deep {
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
  .statistics-DWM-tabs li{
    line-height: 48px;
  }
}
</style>