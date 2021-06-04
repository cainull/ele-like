import {reactive, toRefs, computed} from 'vue'

export default function rateModel() {
  const data = reactive({
    rate: {
      store: {
        overall: 0,
        package: 0,
        quality: 0
      }
    },
    rateObj: {
      overall: '',
      package: '',
      quality: ''
    }
   
  })
  // 根据星星数返回不同的对象
  const rateObj = computed(() => {
    let storeData =  data.rate.store
    
    Object.keys(data.rateObj).forEach(key => {
      data.rateObj[key] = storeData[key] >= 4.5 ? '超赞' : 
                 storeData[key] >= 3.5 ? '满意' :
                 storeData[key] >= 2.5 ? '一般' :
                 storeData[key] >= 1.5 ? '较差' :
                 '很差'
    })
    
    return obj
  })
  

  return {
    ...toRefs(data),
    rateObj
  }
}