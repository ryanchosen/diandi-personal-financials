<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">创建标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList"
          :key="tag.id"
          @click="toggle(tag.name)"
          :class="{selected:value.indexOf(tag.name)!==-1}">
       <span>{{ tag.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper.ts';

@Component(
    {
      computed: {
        tagList() {
          return this.$store.state.tagList;
        }
      }
    }
)
export default class Tags extends mixins(TagHelper) {
  @Prop() value!: string[];

  created() {
    this.$store.commit('fetchTagList');
  }

  toggle(name: string) {
    if (this.value.indexOf(name) === -1) {
      this.value.push(name);
    } else {
      const index = this.value.indexOf(name);
      this.value.splice(index, 1);
    }
    this.$emit('update:selectedTags', this.value); // 告诉 Money 用户选中了哪些tags
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
      margin-bottom: 5px;

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