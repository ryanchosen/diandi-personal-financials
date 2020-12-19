import {createId} from '@/lib/idCreator';
const localStorageKeyName = 'tagList';

const store={
  tagList: [] as Tag[],
  fetchTagList() {
    this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]')
    return this.tagList;
  },
  fetchCurrentTag(id:string){
    return this.tagList.filter(tag => tag.id === id)[0];
  },
  createTag(name:string) {
    const nameList = this.tagList.map(item => item.name);
    if (nameList.indexOf(name) >= 0) {
      window.alert('重复了');
      return
    }
    const id=createId()
    let tag: Tag = {id: '', name: ''};
    tag.name = name;
    tag.id = id.toString();
    this.tagList.push(tag);
    this.saveTagList();
    window.alert('创建成功');
    return
  },
  removeTag(id:string){
    const idList = this.tagList.map(item => item.id);
    const index_IdList = idList.indexOf(id);
    this.tagList.splice(index_IdList,1)
    this.saveTagList();
    return true
  },
  updateTag(newTagName:string, id:string){
    const idList = this.tagList.map(item => item.id);
    const nameList = this.tagList.map(item => item.name);
    const index_IdList = idList.indexOf(id);
    if (idList.indexOf(id) === -1) {return 'not found';}
    if (nameList.indexOf(newTagName) >= 0) {
      return 'duplicated';
    } else {
      this.tagList[index_IdList].name = newTagName;
      this.saveTagList();
      return 'success';
    }
  },
  saveTagList() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
  },
}
export {store}