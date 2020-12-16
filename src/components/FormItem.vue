<template>
  <div>
    <label class="notes">
      <span class="name">{{ this.fieldName }}</span>
      <input type="text" :placeholder="placeholder" :value="localValue" @input="onInput" @change="onChange">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue {
  @Prop({required: true}) fieldName: string;
  @Prop({default: '请在此输入'}) placeholder: string;
  @Prop({default: ''}) readonly value: string;
  localValue = this.value;

  onInput(event: InputEvent) {
    const ET = event.target as HTMLInputElement;
    this.localValue = ET.value;
    this.$emit('update:value', this.localValue);
  }

  onChange(event: KeyboardEvent) {
    const ET = event.target as HTMLInputElement;
    this.localValue = ET.value;
    this.$emit('changeValue', this.localValue);
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