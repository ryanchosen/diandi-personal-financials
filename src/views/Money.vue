<template>
  <Layout class-prefix="layout">
    {{ record }}
    <Tags :data-source.sync="tags" @update:value="onUpdateSelectedTags"/>
    <Notes :note.sync="record.notes" />
    <Types :type.sync="record.type"/>
    <NumberPad :amount.sync="record.amount"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tags from '@/components/Tags.vue';
import Notes from '@/components/Notes.vue';
import Types from '@/components/Types.vue';
import NumberPad from '@/components/NumberPad.vue';

// 声明一个类型
type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number ;
}
@Component({components: {NumberPad, Types, Notes, Tags}})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行'];
  record: Record = {
    tags: [], notes: '', type: '-', amount: 0
  };

  onUpdateSelectedTags(value) {
    this.record.tags = value;
  }

  onUpdateNotes(value) {
    this.record.notes = value;
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