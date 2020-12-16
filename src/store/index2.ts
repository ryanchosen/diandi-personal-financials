import {recordListModel} from '@/model/recordListModel';
import {tagListModel} from '@/model/tagListModel';

const store = {
// 以下是二次封装，第一次封装在各个model中，第二次封装也就封装在store
// record-store
  recordList: recordListModel.fetch(),
  createRecord: (record:MyRecord) => {
    recordListModel.create(record);
  },

// tag-store
  tagList: tagListModel.fetch(),
  findTag(id:string){
    return this.tagList.filter(tag => tag.id === id)[0];
  },
  createTag: (name:string) => {
    const result = tagListModel.create(name);
    if (result === 'duplicated') {
      window.alert('重复了');
    } else {
      window.alert('创建成功');
    }
  },
  removeTag: (id:string) => {
    return tagListModel.remove(id); // 成功返回true 失败返回false
  },
  updateTag: (newTagName:string, id:string) => {
    return tagListModel.update(newTagName, id);
  }
};
export {store}