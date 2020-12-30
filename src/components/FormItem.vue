<template>
  <div>
    <label class="notes">
      <Icon name="comments"/>
      <span class="name">{{ this.fieldName }}</span>
      <template v-if="type==='date'">
        <input :type="type" :placeholder="placeholder" :value="x(value)" @input="onInput" @change="onChange">
      </template>
      <template v-else>
        <input type="text" :placeholder="placeholder" :value="value" @input="onInput" @change="onChange">
      </template>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import dayjs from 'dayjs';

@Component
export default class FormItem extends Vue {
  @Prop({required: true}) fieldName!: string;
  @Prop({default: '请在此输入'}) placeholder!: string;
  @Prop({default: ''}) readonly value!: string;
  @Prop() type?: string;

  onInput(event: InputEvent) {
    const ET = event.target as HTMLInputElement;
    console.log(ET.value);
    this.$emit('update:value', {value: ET.value, type: this.type||'text'});
  }

  onChange(event) {
    this.$emit('changeValue', event.target.value);
  }

  x(isoString) {
    return dayjs(isoString).format('YYYY-MM-DD'); // 格式化，将多余的时分秒信息删除
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