import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import Home from '../components/Home/Home'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: login },
  { path: '/', redirect: '/login' },
  { path: '/home',component: Home}
]

const router = new VueRouter({
  routes
})

export default router
