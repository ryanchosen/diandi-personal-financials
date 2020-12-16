import {clone} from '@/lib/clone';

const localStorageKeyName = 'recordList';
const recordListModel = {
  data: [] as MyRecord[],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as MyRecord[];
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
  create(record:MyRecord){
    const cloneItem = clone(record) // 克隆是为了避免record地址共用
    cloneItem.createAt=new Date();
    this.data.push(cloneItem);
    this.save()
  }

};
export {recordListModel};
