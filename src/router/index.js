import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/farm',
    name: 'Farm',
    component: () => import('../views/Farm.vue')
  },
  {
    path: '/add-farm',
    name: 'Add-farm',
    component: () => import('../views/Addfarm.vue')
  },
  {
    path: '/add-reading',
    name: 'Add-reading',
    component: () => import('../views/Addreading.vue')
  }
  ,
  {
    path: '/data-charts',
    name: 'Data-charts',
    component: () => import('../views/Charts.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
