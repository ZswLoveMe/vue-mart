import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/components/views/Login"
import store from '@/store'
import Home from "@/components/views/Home"

Vue.use(Router)
let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      component:Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component:Login
    },
    {
      path: '/about',
      name: 'about',
      meta: {auth: true},
      component: () => import(/* webpackChunkName: "about" */ '@/components/views/About.vue')
    }
  ]
})
router.beforeEach((to,from,next) => {
  if (to.meta.auth) { // 查看路由是否需要登录
    // 需要认证，则检查令牌
    if (store.state.token) { // 已登录
      next();
    } else {// 去登陆
      next({
        path: '/login',
        query: {redirect: to.path}
      })
    }
  } else {
    next();
  }
})
export default router
