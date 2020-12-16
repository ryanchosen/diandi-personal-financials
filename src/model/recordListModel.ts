const localStorageKeyName='recordList'
const recordListModel={
  clone(data:MyRecord){
    return JSON.parse(JSON.stringify(data))
  },
  fetch(){
    return JSON.parse(window.localStorage.getItem(localStorageKeyName)||'[]') as MyRecord[]
  },
  save(data:MyRecord[]){
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));

  }

}
export {recordListModel}
