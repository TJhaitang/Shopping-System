import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/Merchant/login.vue'
import My from '../components/Merchant/My/My.vue'
import signUp from '../components/Merchant/signUp.vue'
import Commodity from  '../components/Merchant/My/Commodity.vue'
import orders from '../components/Merchant/My/orders.vue'
import information from '../components/Merchant/My/merchant-info.vue'

import login_u from '../components/users/login_u.vue'
import signUp_u from '../components/users/signUp_u.vue'

Vue.use(VueRouter)

const router = new VueRouter( {
  routes: [ 
  { path: '/', redirect: '/login_u' },
  { path: '/login', component: login },
  { path: '/login_u', component: login_u },
  { path: '/my',component: My,
  children: [{path: '/orders',component:orders},
  { path: '/Commodity',component:Commodity},
  {path: '/5',component: information}]
},
  { path: '/signUp',component: signUp},
  { path: '/signUp_u',component: signUp_u}
]})

//挂载路由导航守卫之后再暴露路由
router.beforeEach((to, from, next) => {
  // to:将要访问的路径
  // from: 从哪个路径跳转而来
  // next: 放行函数
  // next() 放行； next('/login') 强制跳转（没有token的时候）
  if(to.path === '/login' || to.path === '/signUp' || to.path === '/signUp_u') return next();
  //拿出token
  const tokenString = localStorage.getItem('token')
  if (!tokenString) return next('/login');
  //如果token存在，可以放行
  next();
})

export default router