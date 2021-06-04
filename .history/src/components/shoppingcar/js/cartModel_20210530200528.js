import {reactive, toRefs, computed, watch} from 'vue'
import {useStore} from 'vuex'

export default function cartModel(props) {
  const $store = useStore()
  const data = reactive({
    /* 动画类名 */
    animateName: '',
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
      return data.state && data.state.total || 0
    }),
    cartOk: computed(() => {
      return data.total > 0
    }),
    rst:computed(()=>{
			return $store.getters.rst
		}),
  })

  const totalPrice = computed(() => {
    let origin_price = 0,
        price = 0;
    if(data.state) {
      Object.keys(data.state).forEach(key => {
        if(key === 'total') return
        let o = data.state[key].original_price,
            p = data.state[key].price;

        if(o) {
          origin_price += o
        }else {
          origin_price += p
        }
        
        price += data.state[key].price
      })
      origin_price = origin_price.toFixed(1)
      price = price.toFixed(1)

      return {
        origin_price,
        price
      }
    }
    else {
      return {
        origin_price: 0,
        price: 0
      }
    }
  })

  watch(() => data.total, (n, o) => {
    console.log(totalPrice)
    if(n > o) {
      data.animateName = 'car 0.3s'

      /* 重置动画 */
      setTimeout(() => {
        data.animateName = ''
      },300)
    }
  }, {
    immediate: true,
    deep: true
  })

  return {
    ...toRefs(data),
    totalPrice
  }
}