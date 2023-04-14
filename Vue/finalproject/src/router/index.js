import { createRouter, createWebHistory } from 'vue-router'
import List from '../components/List.vue'
import Form from '../components/Form.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: List
  },
  {
    path: '/add/payment/:category?',
    name: 'form',
    component: Form
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
