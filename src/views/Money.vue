<template>

  <Layout class-prefix="layout">
    <Tags  :value="record.tags" @update:selectedTags="onUpdateSelectedTags"/>
    <FormItem @update:value="onUpdateValue" :value="record.notes" field-name="备注" placeholder="请在此输入备注"/>
    <Tabs  :data-source="recordTypeList" :value.sync="record.type"/>
    <NumberPad @update:amount="onUpdateAmount" @submit="createRecord"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tags from '@/components/Tags.vue';
import FormItem from '@/components/FormItem.vue';
import NumberPad from '@/components/NumberPad.vue';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';


@Component({
  components: {Tabs, NumberPad, FormItem, Tags},
  computed: {
    tags() {
      return this.$store.state.tagList;
    },
    recordList() {
      return this.$store.state.recordList
    }

  }
})
export default class Money extends Vue {
  recordTypeList=recordTypeList
  created(){
    this.$store.commit('fetchTagList');
    this.$store.commit('fetchRecordList');
  }
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
    if(!this.record.tags||this.record.tags.length===0){
      window.alert('请至少选择一个标签')
    }else{
      this.$store.commit('createRecord', this.record);
      this.record.notes=' ';
      this.record.tags=[];
    }
  }


}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
}
</style>
<style lang="scss" scoped></style>