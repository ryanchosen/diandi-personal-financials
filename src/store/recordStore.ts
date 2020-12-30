import {clone} from '@/lib/clone';
const localStorageKeyName = 'recordList';

let data:MyRecord[]=[];

const recordStore={
  fetchRecordList() {
    return data=JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as MyRecord[];
  },
  recordList: data, // 返回一份data
  createRecord(record:MyRecord){
    const cloneItem = clone(record) // 克隆是为了避免record地址共用
    // cloneItem.createdAt=new Date();
    data.push(cloneItem);
    this.saveRecordList()
  },
  saveRecordList() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  }
}
recordStore.fetchRecordList()
export default recordStore