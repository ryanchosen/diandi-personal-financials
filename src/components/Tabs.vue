<template>
  <div>
    <ul class="tabs" :class="{[classPrefix+'-tabs']:classPrefix}">
      <li v-for="item in dataSource"
          :key="item.value"
          @click="onClick(item.value)"
          :class="{'selected':item.value===value}"
      >{{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Tabs extends Vue {
  @Prop({required: true, type: Array})
  dataSource: Tab[];
  @Prop(String)
  readonly value: string;
  @Prop(String)
  classPrefix?: string;

  onClick(value: string) {
    this.$emit('update:value', value);
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;

  li {
    width: 50%;
    line-height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;

    &.selected {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        height: 4px;
        background: #333333;
        width: 100%;
        bottom: 0;
        display: block;
      }

    }

  }
}
</style>