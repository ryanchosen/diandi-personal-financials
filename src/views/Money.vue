<template>
  <Layout class-prefix="layout">
    {{ recordList }}
    <!--    只有` 类型` 和 `所有标签` 才有必要让数据流是从Money.vue ===> 局部组件-->
    <Tags :data-source.sync="tags" @update:selectedTags="onUpdateSelectedTags"/>
    <FormItem @update:value="onUpdateValue" field-name="备注" placeholder="请在此输入备注"/>
    <Types :type.sync="record.type"/>
    <NumberPad @update:amount="onUpdateAmount" @submit="saveRecord"/>


  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import Tags from '@/components/Tags.vue';
import FormItem from '@/components/FormItem.vue';
import Types from '@/components/Types.vue';
import NumberPad from '@/components/NumberPad.vue';
import {recordListModel} from '@/model/recordListModel.ts';
import {tagListModel} from '@/model/tagListModel';

// 拿到以后先本地创建一份数据，再放到类内部
const  recordList = recordListModel.fetch();
const tags=tagListModel.fetch()

@Component({components: {NumberPad, Types, FormItem, Tags}})
export default class Money extends Vue {
  tags = tags;
  recordList=recordList
  record: MyRecord = {
    tags: [], type: '-', notes: '', amount: 0
  };

  onUpdateSelectedTags(value: string []) {
    this.record.tags = value;
  }

  onUpdateValue(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: number) {
    this.record.amount = value;
  }

  saveRecord() { // 把 newRecord 推到 recordList 里面
    const clone = recordListModel.clone(this.record) // 克隆是为了避免record地址共用
    this.recordList.push(clone);
  }

  // 只要 recordList 一有更新就保存到数据库
  @Watch('recordList')
  onRecordList() {
    recordListModel.save(this.recordList)
  }
}
</script>
<style lang="scss">
.layout-content {
  border: 1px solid red;
  display: flex;
  flex-direction: column;
}
</style>
<style lang="scss" scoped></style>