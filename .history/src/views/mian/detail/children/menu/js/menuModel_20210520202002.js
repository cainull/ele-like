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
    /* 当前菜单内容的高度 */
    con_height:0,
    /* 当前选择左侧菜单分类 */
    menu_index: 0,
    /* 菜单的高度 */
    menu_tops: []
  })

  // 设置菜单内容区域的高度
	const setMenuHeight=()=>{
		var wH=window.outerHeight;//窗体的高度
		// 获取父组件的高度（详情页的nav） detail_nav
		var navH =proxy.$parent.$parent.$refs.detail_nav.offsetHeight;
		// 菜单区域的高度
		var arg =wH-navH;
		data.con_height=arg/37.5 + 'rem';
		
		console.log(wH,navH,arg)
	}

  const menuSelect = i => {
    const main_box = proxy.$refs.menu_main.getElementsByClassName('main_con')[0]
    /* 置空滚动事件 */
    main_box.onscroll = null

    data.menu_index = i
    
    console.log(main_box)
    main_box.scrollTo({
      top: data.menu_tops[i],
      left: 0,
      behavior: 'smooth'
    })

    // 滚动动画完毕后重新监听
    setTimeout(() => {
      listenMainScroll()
    }, 1000)

    
  }

  const getTop = () => {
    const menu_items = proxy.$refs.menu_main.getElementsByClassName('con_item')
    for(let item of menu_items) {
      data.menu_tops.push(item.offsetTop)
    }
  }

  const listenMainScroll = () => {
    const main_box = proxy.$refs.menu_main.getElementsByClassName('main_con')[0]
    let i = data.menu_index
    let next = data.menu_tops[i]
    // 上一次的滚动值，用来判断滚动方向
    let beforeTop = 0
    main_box.onscroll = e => {
      /* 向下滚动时 */
      let nowTop = main_box.scrollTop
      if(nowTop >= beforeTop && nowTop >= next) {
        data.menu_index = i
        /* 重新设置下一个滚动目标值 */
        if(data.menu_tops[++i]) {
          next = data.menu_tops[i]
        }
      }else if(nowTop <= beforeTop && nowTop < next) {
        // console.log(nowTop, next)
        proxy.$autoTop()
        data.menu_index = i - 1
        /* 重新设置下一个滚动目标值 */
        if(data.menu_tops[--i]) {
          next = data.menu_tops[i]
        }else{
          next = data.menu_tops[0]
        }
      }

      // 重新设置beforeTop
      beforeTop = nowTop
      
    }
  }

  onMounted(() => {
    /* 设置内容区域高度 */
    setMenuHeight()

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