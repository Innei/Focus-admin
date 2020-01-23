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
        component: () => import('@/views/Dashboard')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: { isPublic: true },
    component: () => import('@/views/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
