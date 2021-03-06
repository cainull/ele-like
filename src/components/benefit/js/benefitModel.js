import {reactive, computed, toRefs, onMounted, watch} from 'vue'
import {useRouter} from 'vue-router'


export default function benefitModel() {
  const $router = useRouter()
  const data = reactive({
    active: ''
  })

  watch(() => data.active, (n, o) => {
    switch (n) {
      // 红包
      case 0:
        $router.push('/mine/benefit/redpacks')
        return
      case 1:
        $router.push('/mine/benefit/merchants')
        return
      default:
        $router.push('/mine/benefit/offsets')
    }
  })

  return {
    ...toRefs(data)
  }
}