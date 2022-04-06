import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/member/:id',
    name: 'member',
    component: () => import('@/views/Member.vue')
  },
  {
    path: '/modify',
    name: 'modify',
    component: () => import('@/views/ModifyList.vue')
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('@/views/Edit.vue')
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('@/views/Edit.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
