import { Sidebar, SidebarItem } from 'vant';
import { ref, reactive, onMounted, computed, toRefs, getCurrentInstance } from 'vue'
import { Toast } from 'vant'; 
import { useStore } from 'vuex'

function MenuModel() {
  // const active = ref(0);
  // const onChange = (index) => Toast(`标签名 ${index + 1}`);
  // return {
  //   active,
  //   onChange,
  // };
  const $store = useStore()
  const {proxy} = getCurrentInstance()

  const data = reactive({
    /* 菜单数据列表 */
    menu: computed(() => {
      return $store.getters['detail/menu']
    }),
    /* 商家推荐数据 */
    recommend: computed(() => {
      return $store.getters['detail/recommend']
    }),
    /* 当前选择左侧菜单分类 */
    menu_index: 0,
    /* 菜单的高度 */
    menu_tops: []
  })

  const menuSelect = i => {
    data.menu_index = i
    const main_box = proxy.$refs.menu_main.getElementsByClassName('main_con')[0]
    console.log(main_box)
    main_box.scrollTo({
      top: data.menu_tops[i],
      left: 0,
      behavior: 'smooth'
    })

  }

  const getTop = () => {
    const menu_items = proxy.$refs.menu_main.getElementsByClassName('con_item')
    for(let item of menu_items) {
      data.menu_tops.push(item.offsetTop)
    }
  }

  const listenMainScroll = () => {
    const main_box = proxy.$refs.menu_main.getElementsByClassName('main_con')[0]
    let i = 1
    let next = data.menu_tops[i] 
    main_box.onscroll = e => {
      if(main_box.scrollTop >= next) {
        data.menu_index = i
        /* 重新设置下一个滚动目标值 */
        if(data.menu_tops[++i]) {
          next = data.menu_tops[i]
        }
      }
      console.log(main_box.scrollTop)
    }
  }

  onMounted(() => {
    /* 获取每一项菜单的滚动纵坐标 */
    getTop()

    /* 监听菜单滚动 */
    listenMainScroll()
  })

  return {
    ...toRefs(data),
    menuSelect
  }
}


export default MenuModel