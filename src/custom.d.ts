// 声明一个类型
type MyRecord = {
  tags: string[];
  notes?: string;
  type: string;
  amount?: number;
  createdAt?: Date
}
type Tag = {
  id: string,
  name: string
}
type TagListModel = {
  data: Tag[],  // [{id:'',name:''},{id:'',name:''}]
  fetch: () => Tag[],
  save: () => void,
  update: (tagName: string, id: string) => 'success' | 'duplicated' | 'not found',
  create: (name: string) => 'success' | 'duplicated' // 联合类型 说明了 只能返回这两种结果 有助于解决拼写问题
  remove: (id: string) => boolean
}


interface Window {  // window.tagList = tagListModel.fetch() 不报错
  tagList: Tag[]
  createTag:(name:string)=>void
  removeTag:(id:string)=>boolean
  updateTag:(id:string,name:string)=>'success' | 'duplicated' | 'not found'
  findTag:(id:string)=>Tag

  recordList:MyRecord[]
  createRecord:(record:MyRecord)=>void
}