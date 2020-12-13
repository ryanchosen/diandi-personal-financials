<template>
  <div>
    <ul class="types">
      <li :class="type==='-'?'selected':''" @click="selectType('-')">支出</li>
      <li :class="type==='+'?'selected':''" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Types extends Vue {
  type= '-'; //  减号支出，加号收入
  selectType(type: string) {
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown'); // 健壮性
    }
    this.type = type;
  }

}

</script>

<style lang="scss" scoped>
.types {
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