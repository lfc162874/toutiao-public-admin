import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
import Artile from '@/views/artile'
import Publish from '@/views/publish'
Vue.use(VueRouter)
// 路由注册表
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/layout',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home
      },
      {
        path: '/artile',
        name: 'artile',
        component: Artile
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 路由导航守卫，所有页面的导航都经过这里
router.beforeEach((to, from, next) => {
  // 思路;1:先判断是否访问的是login登录页面；
  // 2：如果不是则判断token状态，从而判断出是不是为登录状态
  // 3：如果没有token，跳转回登录页面，如果有则放行继续访问
  // 首先去拿到user这个对象
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (to.path !== '/login') {
    if (user) {
      console.log('1111')
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
