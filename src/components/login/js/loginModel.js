import {getCurrentInstance,toRefs,reactive,onMounted,computed} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {getStore, setStore, setSession} from '@/utils/deposit'
import { Toast } from 'vant';

export default function loginModel() {
  const $router = useRouter()
  const $route = useRoute()
  const state = reactive({
    username: '',
    password: '',
  });
  const onSubmit = (values) => {
    // console.log('submit', values);
    let nowAccounts = JSON.parse(getStore('accounts'))
    // console.log(nowAccounts)
    nowAccounts.forEach(item => {
      // 密码与用户名对的上
      if(item.username === values.username && item.password === values.password) {
        setStore('token', '1')
        // 将当前用户信息保存到sessionStorage
        setSession('user', JSON.stringify(item))

        // 即将回调到用户初始点击的那
        let redirectUrl = $route.query.redirect
        
        // 消息提示
        Toast.success({
          iconSize: '60',
          message: '登录成功',
          duration: 1500,
          onClose: () => {
            if(redirectUrl !== 'undefined') {
              $router.push(redirectUrl)
            }else {
              $router.push('/mine')
            }
          }
        })

        // 停止循环
        return
      }
      // 密码或者用户名错误
      else {
        Toast.fail({
          iconSize: '30',
          message: '密码或用户名输入错误'
        })
      }
    })
  };

  return {
    state,
    onSubmit
  }
}