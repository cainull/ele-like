import {getCurrentInstance,toRefs,reactive,onMounted,computed} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useStore} from 'vuex'

export default function addModel() {
  const $router = useRouter()

  function back() {
    $router.back()
  }

  return {
    back
  }
}