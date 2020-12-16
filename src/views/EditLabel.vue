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
import {tagListModel} from '@/model/tagListModel';
import FormItem from '@/components/FormItem.vue';
import Button from '@/components/Button.vue';


@Component({components: {Button, FormItem}})
export default class EditLabel extends Vue {
  tag: Tag = {id: '', name: ''};

  created() {
    const id = this.$route.params.id;
    const tags = tagListModel.fetch();
    this.tag = tags.filter(item => item.id === id)[0]; // 一进来先得到当前tag
    if (!this.tag) {
      this.$router.replace('/404');
    }
  }

  goBack() {
    this.$router.back();
  }

  remove() {
    const result=tagListModel.remove(this.tag.id);
    if(result==='success'){
      alert('删除成功')
      this.$router.back()
    }
  }
// 不要把对象扔过去，而是把字面量扔过去
// 通过id去查在数组中排第几，
// id不等于数组中的排名，
// 然后如果可以查到id再判断，
// 查不到直接说'not found',
// 查得到再判断一下名字是不是重复了
  onChangeValue(newTagName: string) {
    const result = tagListModel.update(newTagName, this.tag.id);
    if (result === 'duplicated') {
      window.alert('标签名重复了');
    } else {
      window.alert('更新成功');
    }
  }
}

</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
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