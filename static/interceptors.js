//拦截 所有http请求 预先放入token

import axios from "axios"
import store from "../src/store"
import router from "../src/router"


axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.token = store.state.token
    }
    return config
  })

axios.interceptors.response.use(
  respones => {
    //如果是-1 则需要重新登录
    if(respones.status == 200){
      const data = respones.data
      if (data.code == -1){
        //清除缓存
        clearHandle()
      }
    }
    return respones
  },error => {
    if(error.response.status == 401){
      clearHandle()
    }
  }
)

function clearHandle(){
  store.commit('setToken','')
  localStorage.removeItem('token')

  console.log('router.currentRoute.path：', router.currentRoute.path)

  //跳转login界面
  router.push({
    path:'/login',
    query:{redirect:router.currentRoute.path}
  })
}
