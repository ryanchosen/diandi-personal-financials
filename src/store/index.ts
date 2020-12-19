import Vue from 'vue';
import Vuex from 'vuex';
import {clone} from '@/lib/clone';
import {createId} from '@/lib/idCreator';

Vue.use(Vuex); // 作用是把store放在Vue.prototype上
const RecordList = 'recordList';
const TagList = 'tagList';


const store = new Vuex.Store({
  state: {
    recordList: [] as MyRecord[],
    tagList: [] as Tag[],
    currentTag:{}
  },
  mutations: {
    fetchRecordList(state) {
      state.recordList = JSON.parse(window.localStorage.getItem(RecordList) || '[]') as MyRecord[];
    },
    createRecord(state, record: MyRecord) {
      const cloneItem = clone(record);
      cloneItem.createAt = new Date();
      state.recordList.push(cloneItem);
      store.commit('saveRecordList');
    },
    saveRecordList(state) {
      window.localStorage.setItem(RecordList, JSON.stringify(state.recordList));
    },
    fetchTagList(state) {
       state.tagList = JSON.parse(window.localStorage.getItem(TagList) || '[]');
    },
    fetchCurrentTag(state, id:string){
      state.currentTag=state.tagList.filter(tag => tag.id === id)[0];
    },
    createTag(state, name: string) {
      const nameList = state.tagList.map(item => item.name);
      if (nameList.indexOf(name) >= 0) {
        window.alert('重复了');
        return;
      }
      const id = createId();
      let tag: Tag = {id: '', name: ''};
      tag.name = name;
      tag.id = id.toString();
      state.tagList.push(tag);
      store.commit('saveTagList');
      window.alert('创建成功');
      return;
    },
    removeTag(state,id:string){
      const idList = state.tagList.map(item => item.id);
      const index_IdList = idList.indexOf(id);
      state.tagList.splice(index_IdList,1)
      store.commit('saveTagList')
      alert('删除成功');
    },
    updateTag(state, tag:Tag) {
      const {id,name}=tag;
      const idList = state.tagList.map(item => item.id);
      const nameList = state.tagList.map(item => item.name);
      const index_IdList = idList.indexOf(id);
      if (idList.indexOf(id) === -1) {return 'not found';}
      if (nameList.indexOf(name) >= 0) {
        window.alert('标签名重复了');
      } else {
        state.tagList[index_IdList].name = name;
        store.commit('saveTagList');
        window.alert('更新成功');
      }
    },
    saveTagList(state) {
      window.localStorage.setItem(TagList, JSON.stringify(state.tagList));
    },
  },
  actions: {},
  modules: {}
});
export default store;
