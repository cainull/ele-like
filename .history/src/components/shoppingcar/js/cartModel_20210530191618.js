import {reactive, toRefs, computed, watch} from 'vue'
import {useStore} from 'vuex'

export default function cartModel(props) {
  const $store = useStore()
  const data = reactive({
    // 加购状态
    foodState: computed(() => {
      return $store.state.cart.foods
    }),
    // 用户加购的当前商家的商品信息
    state: computed(() => {
      return data.foodState[props.resId]
    }),
    // 总数据条数
    total: computed(() => {
      return data.state.total
    }),
    cart_ok: computed(() => {
      return data.total > 0
    })
  })

  watch(() => data.state, (o, n) => {
    console.log(n)
  }, {
    immediate: true,
    deep: true
  })

  return {
    ...toRefs(data)
  }
}