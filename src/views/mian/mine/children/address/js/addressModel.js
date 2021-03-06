import {getCurrentInstance,toRefs,reactive,onMounted,computed} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {getStore, setStore} from '@/utils/deposit'
import {Dialog, Toast} from 'vant'

export default function addressModel() {
  const $router = useRouter()
  const data = reactive({
    /* 初始化地址列表 */
    addressList: []
  })

  function back() {
    $router.back()
  }

  function toAddressAdd() {
    $router.push('/mine/address/add')
  }

  function toAddressEdit(item) {
    setStore('needEditAddr', JSON.stringify(item))
    $router.push('/mine/address/edit')
  }

  function showDeleteDialog(id) {
    // console.log(data.addressList)
    Dialog.confirm({
      title: '删除地址',
      message: '你确定要删除该地址吗？'
    })
      .then(() => {
        // 确定
        const i = data.addressList.findIndex(item => {
          return item.id === id
        })
        console.log(i)
        data.addressList.splice(i, 1)

        // 轻提示
        Toast.success({
          message: '删除地址成功',
          iconSize: '60',
          duration: 1500
        })

        // 结果保存到localStorage
        setStore('address', JSON.stringify(data.addressList))
      })
      .catch(() => {
        // 取消
      })
  }

  onMounted(() => {
    data.addressList = JSON.parse(getStore('address'))
  })


  return {
    back,
    toAddressAdd,
    ...toRefs(data),
    toAddressEdit,
    showDeleteDialog
  }
}