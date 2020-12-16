import {createId} from '@/lib/idCreator'
const localStorageKeyName = 'tagList';
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
  update(newTagName: string, id: string) {
    const idList = this.data.map(item => item.id);
    const nameList = this.data.map(item => item.name);
    const index_IdList = idList.indexOf(id);
    if (idList.indexOf(id) === -1) {return 'not found';}
    if (nameList.indexOf(newTagName) >= 0) {
      return 'duplicated';
    } else {
      this.data[index_IdList].name = newTagName;
      this.save();
      return 'success';
    }
  },
  create(name) {
    const nameList = this.data.map(item => item.name);
    if (nameList.indexOf(name) >= 0) {
      return 'duplicated';
    }
    const id=createId()
    let tag: Tag = {id: '', name: ''};
    tag.name = name;
    tag.id = id.toString();
    this.data.push(tag);
    this.save();
    return 'success';
  },
  remove(id:string){
    const idList = this.data.map(item => item.id);
    const index_IdList = idList.indexOf(id);
    this.data.splice(index_IdList,1)
    this.save();
    return true
  }

};
export {tagListModel};
