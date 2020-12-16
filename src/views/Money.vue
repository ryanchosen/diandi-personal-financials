<template>
  <Layout class-prefix="layout">
    {{ recordList }}
    <!--    只有` 类型` 和 `所有标签` 才有必要让数据流是从Money.vue ===> 局部组件-->
    <Tags :data-source.sync="tags" @update:selectedTags="onUpdateSelectedTags"/>
    <FormItem @update:value="onUpdateValue" field-name="备注" placeholder="请在此输入备注"/>
    <Types :type.sync="record.type"/>
    <NumberPad @update:amount="onUpdateAmount" @submit="createRecord"/>


  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tags from '@/components/Tags.vue';
import FormItem from '@/components/FormItem.vue';
import Types from '@/components/Types.vue';
import NumberPad from '@/components/NumberPad.vue';




@Component({components: {NumberPad, Types, FormItem, Tags}})
export default class Money extends Vue {
  tags = window.tagList; // 全局数据管理，写在main.ts中
  recordList=window.recordList
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

  createRecord() { // 把 newRecord 推到 recordList 里面
    window.createRecord(this.record)
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