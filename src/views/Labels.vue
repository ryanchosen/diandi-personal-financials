<template>
  <Layout>
    <div class="tags">
      <router-link
          :to="`labels/edit/${tag.id}`"
          class="tag"
          v-for="tag in tags"
          :key="tag.id">
        <span>{{ tag.name }}</span>
        <Icon name="right"></Icon>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button @click.native="create">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {tagListModel} from '@/model/tagListModel';
import Button from '@/components/Button.vue';


@Component({
  components: {Button}
})
export default class Labels extends Vue {
  tags = tagListModel.fetch(); // 保证Labels页面的数据始终与 tagListModel.data 挂钩

  create() {
    const name = window.prompt('请输入标签名');
    if (name) {
      const result = tagListModel.create(name);
      if (result === 'duplicated') {
        window.alert('重复了');
      } else {
        window.alert('创建成功');

      }
    }
  }

}

</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 20px;

  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
  }

  svg {
    width: 18px;
    height: 18px;
    color: #666;
    margin-right: 16px;
  }
}

.createTag-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 28px;
}

</style>