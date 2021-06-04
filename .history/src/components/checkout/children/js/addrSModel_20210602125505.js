import {getCurrentInstance,toRefs,reactive,onMounted,computed} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'

export default function AddrSelectModel() {
  const data = reactive({
    show: {
      choseOther: false,
    }
  })
  return {
    ...toRefs(data)
  }
}