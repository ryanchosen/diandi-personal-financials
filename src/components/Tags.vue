<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in dataSource"
          :key="tag.id"
          @click="toggle(tag.name)"
          :class="{selected:selectedTags.indexOf(tag.name)!==-1}">
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Tags extends Vue {
  // dataSource的数据流向是Money.vue => Tags.vue => Money.vue
  @Prop() readonly dataSource!: string[]; // 感叹号断言表示 外部数据dataSource不可能为null也不可能为undefined
  selectedTags: string[] = []; // selectedTags的数据流向是 Tags.vue => Money.vue

  toggle(tag: string) {
    if (this.selectedTags.indexOf(tag) === -1) {
      console.log((1))
      this.selectedTags.push(tag);
    } else {
      const index = this.selectedTags.indexOf(tag);
      this.selectedTags.splice(index, 1);
    }
    this.$emit('update:selectedTags', this.selectedTags); // 告诉 Money 用户选中了哪些tags
  }

  create() {
    const newTagName = window.prompt('请输入标签名');
    if (newTagName === ' ') {
      window.alert('标签名不能为空');
    } else {
      this.$emit('update:dataSource', [...this.dataSource, newTagName]);
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
      $bg: #d9d9d9;
      background: $bg;
      $height: 24px;
      height: $height;
      line-height: $height;
      border-radius: 12px;
      padding: 0 16px;
      margin-right: 12px;

      &.selected {
        background: darken($bg, 50%);
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