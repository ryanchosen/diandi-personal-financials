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
      <Button @click.native="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper.ts';


@Component({
  components: {Button},
  computed: {
    tags() {
      return this.$store.state.tagList;
    }
  }
})
export default class Labels extends mixins(TagHelper) {
  created() {
    this.$store.commit('fetchTagList');
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