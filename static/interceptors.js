//拦截 所有http请求 预先放入token

import axios from 'axios'
import store from "../src/store"

axios.interceptors.request.use(
  config =>{
    if(store.state.token){
        config.headers.token =store.state.token
    }
    return config
  })
