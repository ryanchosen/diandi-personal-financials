<template>
  <div class="numberPad">
    <div class="output">{{ localAmount }}</div>
    <div class="buttons" @click="onClick">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button @click="remove">删除</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button @click="clear">清空</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button class="ok" @click="ok">OK</button>
      <button class="zero">0</button>
      <button>.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  localAmount = '0';
  numberDotStr = '0123456789.';

  remove() {
    this.localAmount = this.localAmount.substring(0, this.localAmount.length - 1);
  }

  clear() {
    this.localAmount = '0';
  }

  ok() {
    const amount=parseFloat(this.localAmount);
    if(amount!==0){
      this.$emit('update:amount', parseFloat(this.localAmount));
      this.$emit('submit')
    }
  }

  onClick(e: MouseEvent) {
    const button = e.target as HTMLButtonElement; // 强制告诉typescript e.target是一个button元素，为了解决ts的报错，
    const inputContent = button.innerText;
    const output = this.localAmount;
    if (this.numberDotStr.indexOf(inputContent) === -1) {return;}
    if (output.length === 16) {return;}
    if (output === '0') {
      if (inputContent === '.') {
        this.localAmount += inputContent;
      } else {
        this.localAmount = inputContent;
      }
    } else {
      if ([...output.matchAll(/\./g)].length === 0) {
        this.localAmount += inputContent;
      } else if ([...output.matchAll(/\./g)].length === 1) {
        if (inputContent !== '.') {
          this.localAmount += inputContent;
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";

.numberPad {
  .output {
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    min-height: 72px;
  }

  .buttons {
    @extend %clearFix;

    > button {
      width: 25%;
      height: 64px;
      float: left;
      font-size: 18px;
      border-radius: 5px;

      &.ok {
        height: 64*2px;
        float: right;
      }

      &.zero {
        width: 50%;
      }

      $bg: #f2f2f2;

      &:nth-child(1) {
        background: $bg;
      }

      &:nth-child(2), &:nth-child(5) {
        background: darken($bg, 4%)
      }

      &:nth-child(3), &:nth-child(6), &:nth-child(9) {
        background: darken($bg, 4%*2)
      }

      &:nth-child(4), &:nth-child(7), &:nth-child(10) {
        background: darken($bg, 4%*3)
      }

      &:nth-child(8), &:nth-child(11), &:nth-child(13) {
        background: darken($bg, 4%*4)
      }

      &:nth-child(12), &:nth-child(14) {
        background: darken($bg, 4%*5)
      }
    }

  }
}
</style>