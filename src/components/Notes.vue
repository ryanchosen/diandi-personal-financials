<template>
  <div>
    <label class="notes">
      <span class="name">备注</span>
      <input type="text" placeholder="在这里输入备注" v-model="localNote">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class Notes extends Vue {
  @Prop() note: string
  localNote=this.note;

  // 以下三句话都是Watch装饰器的用法
  @Watch('localNote')
  onLocalNoteChanged(value){
    this.$emit('update:note',value)
  }
}
</script>

<style lang="scss" scoped>
.notes {
  background: #f5f5f5;
  font-size: 14px;
  padding: 0 16px;
  display: flex;
  align-items: center;

  .name {
    padding: 16px;
  }

  input {
    height: 64px;
    flex-grow: 1;
    background: transparent;
    border: none;
  }
}
</style>