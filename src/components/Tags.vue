<template>
  <div class="tags">

    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="(tag,index) in dataSource" :key="index" @click="toggle(tag)" :class="selectedTags.indexOf(tag)!==-1&&'selected'">{{tag}}</li>


    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Tags extends Vue {
  @Prop() dataSource: string[];
  selectedTags: string[]=[];
  toggle(tag){
    if(this.selectedTags.indexOf(tag)===-1){
      this.selectedTags.push(tag)
    }else {
      const index=this.selectedTags.indexOf(tag);
      this.selectedTags.splice(index,1)
    }
    this.$emit('update:value',this.selectedTags)
  }
  createTag(){
    const tagName=window.prompt('请输入标签名')
    console.log(tagName)
    if(tagName===' '){
      window.alert('标签名不能为空')
    }else{
      this.$emit('update:dataSource',[...this.dataSource,tagName])
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;

  > .current {
    display: flex;
    flex-wrap: wrap;
    overflow: auto;

    > li {
      $bg:#d9d9d9;
      background: $bg;
      $height: 24px;
      height: $height;
      line-height: $height;
      border-radius: 12px;
      padding: 0 16px;
      margin-right: 12px;
      &.selected{
        background: darken($bg,50%);
        color: white;
      }
    }
  }

  > .new {
    padding-top: 16px;

    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>