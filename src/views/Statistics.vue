<template>
  <Layout>
    <Tabs class-prefix="statistics-types" :data-source="recordTypeList" :value.sync="recordTypeValue"/>
    <div class="echart-wrapper" ref="echartWrapper">
      <Chart :options="chartOptions" class="echart" :loading="loading"></Chart>
    </div>
    <ol v-if="groupedList.length>0">
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">{{ dayJS(group.title) }} <span>￥ {{ group.total }}</span></h3>
        <ol>
          <li class="record" v-for="(item,index) in group.items" :key="index"><span>{{ tagString(item.tags) }}</span>
            <span>{{ item.notes }}</span><span>￥ {{ item.amount }}</span></li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">目前没有{{ recordTypeValue === '-' ? '支出' : '收入' }}记录</div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Chart from '@/components/Chart.vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import dayWeekMonthList from '@/constants/dayWeekMonthList';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import {clone} from '@/lib/clone';
import _ from 'lodash';

@Component({
  components: {Tabs, Chart},
  computed: {
    recordList() {
      return this.$store.state.recordList;
    },
    groupedList() { // 点选’支出‘/’收入‘时，会更改本地的recordTypeValue，一旦有更改，这里的计算属性就会重新计算。
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      const {recordList} = this;
      const newRecordList = clone(recordList).filter(r => r.type === this.recordTypeValue).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()); // 对旧的list做了一个排序
      if (newRecordList.length === 0) {return [];}
      const result = [{
        title: dayjs(newRecordList[0].createdAt).format('YYYY-MM-DD'),
        items: [newRecordList[0]],
        total: 0
      }];
      for (let i = 1; i < newRecordList.length; i++) {
        const current = newRecordList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current], total: 0});
        }
      }
      result.map(group => {      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        group.total = group.items.reduce((sum, item) => sum + item.amount, 0).toFixed(1);
      });
      return result;
    },
    create30DaysData(){
      const today = new Date();
      const array = [];
      // 创建一个容器，30天
      // 从数据库中find出匹配项塞进容器
      for (let i = 0; i <= 29; i++) {
        const date = dayjs(today)
            .subtract(i, 'day').format('YYYY-MM-DD');
        const found = _.find(this.recordList, {createdAt: date});
        array.push({
          date: date, value: found ? found.amount : 0
        });
      }
      return array;
    },
    chartOptions() {
      const keys=_.map(this.create30DaysData, (item)=>{
        return item.date.substring(5)
      }).reverse();
      const values=_.map(this.create30DaysData, _.property('value')).reverse();

      return {
        grid: {
          left: 0,
          right: 0,
        },
        xAxis: {
          type: 'category',
          data: keys,
          axisTick: {show: false},
          axisLine: {lineStyle: {color: '#666'}}
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [{
          data: values,
          type: 'line',
          symbol: 'circle',
          symbolSize: 12,
          itemStyle: {borderWidth: 1, color: '#666', borderColor: '#666'}
        }],
        tooltip: {
          show: true,
          triggerOn: 'click',
          formatter: '{c}',
          extraCssText: 'box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);',
          position: 'top',
          backgroundColor: '#666',
          padding: 2,
          textStyle: {
            color: '#fff',
          },

        },
      };
    }
  }
})

export default class Statistics extends Vue {
  created() {
    this.$store.commit('fetchRecordList');
  }

  mounted() {
    (this.$refs.echartWrapper as HTMLDivElement).scrollLeft = (this.$refs.echartWrapper as HTMLDivElement).scrollWidth;
  }

  dayJS(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日');
    } else {
      return day.format('YYYY年MM月DD日');
    }
  }

  tagString(tags) {
    return tags.length === 0 ? 'No Tags' : tags.join(', ');
  }

  recordTypeValue = '-'; // 给出初始值，并且能回收到更改后的值
  recordTypeList = recordTypeList;
  dayWeekMonthList = dayWeekMonthList;
  loading = false;
}
</script>

<style lang="scss" scoped>
.echart {
  width: 430%;

  &-wrapper {
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

::v-deep {
  canvas {
    margin-top: 10px !important;
  }

  .statistics-types {
    &-tabs {
      .selected {
        background: white;
      }
    }
  }

  .statistics-types-tabs .selected::after {
    display: none !important;
  }

}

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.title {
  @extend %item;
  background-color: #f5f4f6;
}

.record {
  @extend %item;
  background: white;

  > span:nth-child(2) {
    max-width: 40vw;
    margin-right: auto;
    margin-left: 10px;
    color: #999;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

}

.noResult {
  padding: 30px;
  text-align: center;
}
</style>