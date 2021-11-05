import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import Home from '../components/Home/Home'
import Message from '../components/Message/Message'
import My from '../components/My/My'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: login },
  { path: '/', redirect: '/login' },
  { path: '/home',component: Home},
  { path: '/message',component: Message},
  { path: '/my',component: My}
]

const router = new VueRouter({
  routes
})

export default router
