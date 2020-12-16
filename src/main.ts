import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import {tagListModel} from '@/model/tagListModel';
import {recordListModel} from '@/model/recordListModel';


Vue.config.productionTip = false;
Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

// 以下是二次封装，第一次封装在各个model中，第二次封装也就封装在store
// record-store
window.recordList=recordListModel.fetch()
window.createRecord=(record)=>{
  recordListModel.create(record)
}

// tag-store
window.tagList = tagListModel.fetch();
window.findTag=(id)=>{
  return window.tagList.filter(tag=>tag.id===id)[0];
}
window.createTag = (name) => {
  const result = tagListModel.create(name);
  if (result === 'duplicated') {
    window.alert('重复了');
  } else {
    window.alert('创建成功');
  }
};
window.removeTag=(id)=>{
  return tagListModel.remove(id); // 成功返回true 失败返回false
}
window.updateTag=(newTagName,id)=>{
  return tagListModel.update(newTagName,id)
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
