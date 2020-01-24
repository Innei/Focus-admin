import Vue from 'vue'
import VueRouter from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: BasicLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: { title: '仪表盘', icon: ['fas', 'tachometer-alt'] },
        component: () => import('@/views/Dashboard')
      },
      {
        path: 'posts',
        name: 'posts',
        meta: { title: '博文', icon: ['fas', 'tachometer-alt'] },
        component: () => import('@/views/Dashboard')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: { isPublic: true, title: '登陆' },
    component: () => import('@/views/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
