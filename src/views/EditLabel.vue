<template>
  <Layout>
    <div class="navBar">
      <Icon name="left" class="leftIcon" @click.native="goBack"/>
      <span class="title">编辑标签</span>
      <div class="rightIcon"></div>
    </div>
    <div class="form-wrapper">
      <FormItem field-name="标签名" placeholder="请输入标签名" :value="tag.name" @changeValue="onChangeValue"/>
    </div>
    <div class="button-wrapper">
      <Button @click.native="remove">删除标签</Button>
    </div>
  </Layout>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/FormItem.vue';
import Button from '@/components/Button.vue';


@Component({
  components: {Button, FormItem},
})
export default class EditLabel extends Vue {
  get tag() {
    return this.$store.state.currentTag;
  }
  created() {
    this.$store.commit('fetchTagList');
    this.$store.commit('fetchCurrentTag', this.$route.params.id);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    if (!this.tag) {
      this.$router.replace('/404');
    }
  }

  goBack() {
    this.$router.back();
  }

  remove() {
    this.$store.commit('removeTag', this.tag.id);
    this.$router.back();
  }

  onChangeValue(newTagName: string) {
    this.$store.commit('updateTag', {name: newTagName, id: this.tag.id});
  }
}

</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 20px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .title {
  }

  > .leftIcon {
    width: 24px;
    height: 24px;
  }

  > .leftIcon {
    width: 24px;
    height: 24px;
  }
}

.form-wrapper {
  background: white;
  margin-top: 8px;
}

.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 24px;
}
</style>