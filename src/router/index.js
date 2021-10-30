import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: login },
  { path: '/', redirect: '/login' }
]

const router = new VueRouter({
  routes
})

export default router
